

import { deepMerge, getElement } from '../../../utils/utils';

import { bindObserverMetods } from '../../../utils/observerMetods';
import { addButtonsActived, addButtonsDisabled, getCountersItemName, getSubtractButton, itemButtonClicked, subtractButtonActived, subtractButtonDisabled } from '../__dropdown-item/dropdown-item';
import { applayButtonClicked, clearButtonClicked, getAllItemsCounter, getInput, switchToClosedState, switchToOpenState } from '../dropdown';

export const consts = {
  changeSelectedItems: 'cangeSelectedItems',
  applySelectedItems: 'applySelectedItems',
	itemButtonClicked: 'itemButtonClicked',
	onZeroItemCounter: 'onZeroCounter',
	counterIsGreaterThanZero: 'counterIsGreaterThanZero',
	
  dropdownShowClassName: 'dropdown__expand-container_show',
};

const optionDefault = {
  inline: false,
  showEvent: 'focus',
	minItemValue: 0,
	totalMaxValue: '',
	isAddButtonsDisabled: false,
  ItemsRequiredMessage: '',
  footerButtonActived: false,
  clearFooterButtonName: 'очистить',
  applyFooterButtonName: 'применить',
};

export class Dropdown {
  constructor(dropdown, options) {
    this.dropdown = dropdown;

    this.opts = deepMerge({}, optionDefault, options);

    this.inited = false;
    this.visible = false;

    this.init();
  }

  init() {
    bindObserverMetods(this);

    if (this.opts.visible) {
      this.show();
    }
   
    if (this.opts.elementReadonly) {
      getInput(this.dropdown).setAttribute('readonly', '');
      this.elementReadonly = true;
    }
		this.initSelectedItems();
	
    this.inted = true;
  }

	initSelectedItems = () => {
		this.selectedItems = new Map();
		this.totalCounter = 0;
		getAllItemsCounter(this.dropdown).forEach(counter => this.selectedItems.set(getCountersItemName(counter), counter.value));
		this.trigger(consts.changeSelectedItems);
	}

	

  bindEvents() {
    getInput(this.dropdown).addEventListener(this.opts.showEvent, this.onFocus);
    getInput(this.dropdown).addEventListener('blur', this.onBlur);
    this.dropdown.addEventListener('mousedown', this.onMouseDown);
    this.dropdown.addEventListener('mouseup', this.onMouseUp);
    
  }

  attachFooterButtonListener() {
		if (this.opts.footerButtonActived) {
			this.dropdown.addEventListener('click', this.handleClickFooterButton);
		} 
  }

	removeFooterButtonListener() {
		if (this.opts.footerButtonActived) {
			this.dropdown.removeEventListener('click', this.handleClickFooterButton);
		} 
	}

  //  Subscription events
  // -------------------------------------------------

  onFocus = (e) => {
    if (!this.visible) {
      this.show();
    }
  };

  onBlur = (e) => {
    if (!this.inFocus && this.visible) {
      this.hide();
    }
  };

  onMouseDown = (e) => {
    this.inFocus = true;
  };

  onMouseUp = (e) => {
    this.inFocus = false;
    getInput(this.dropdown).focus();
  };

	handleClickItemButton = (e) => {
		itemButtonClicked(e, this.itemButtonClickedTrigger)
  };

	handleClickFooterButton = (e) => {
		this.footerButtonClicked(e)
	}

	//  Subscription events with observer methods
  // -------------------------------------------------

	
	onItemButtonClicked = (button, counter, itemName) => {
		this.checkMinItemValue(this.opts.minItemValue, this.selectedItems[itemName], counter, button)
		this.selectedItems[itemName] = counter;
		this.checkTotalMaxValue(this.opts.totalMaxValue);
		this.trigger(consts.changeSelectedItems);
	}

  onChangeSelectedItems = () => {
    this.updateInputValueView();

    if (this.opts.footerButtonActived) {
      this.checkDisableClearButton();
    }
  };

	
  // -------------------------------------------------

  show() {
		this.dropdown.addEventListener('click', this.handleClickItemButton);
		this.on(consts.itemButtonClicked, this.onClickItemButton);
		this.on(consts.changeSelectedItems, this.onChangeSelectedItems);
		this.attachFooterButtonListener();

    this.visible = true;
		switchToOpenState(this.dropdown);
  }

  hide() {
		this.dropdown.removeEventListener('click', this.handleClickItemButton);
		this.of(consts.itemButtonClicked, this.onClickItemButton);
		this.of(consts.changeSelectedItems, this.onChangeSelectedItems);
		this.removeFooterButtonListener();

		getInput(this.dropdown).blur();

    this.visible = false;
    switchToClosedState(this.dropdown);
  }

  updateInputValueView = () => {
    let requiredValues = [];

    let requiredItems = this.opts.ItemsRequired;

    if (requiredItems) {
      Object.keys(this.selectedItems).forEach((item) => {
        if (requiredItems.includes(item)) {
          requiredValues.push(this.selectedItems[item]);
        }
      });

      if (requiredValues.includes(0)) {
        if (this.selectedItemsIsEmty()) {
          getInput(this.dropdown).value = '';
        } else {
          getInput(this.dropdown).value = this.opts.ItemsRequiredMessage;
        }
      } else {
        getInput(this.dropdown).value = this.format(this.selectedItems);
      }
    } else {
      getInput(this.dropdown).value = this.format(this.selectedItems);
    }
  };

	getTotalCounter(){
		let totalCounter = 0;
		getAllItemsCounter(this.dropdown).map(value => totalCounter+= value);
		return totalCounter;
	} 

  selectedItemsIsEmty() {
    if(this.getTotalCounter() === 0){
			return true;
		}
		return false;
  }

	clearItemsCounter = () => {
		getAllItemsCounter(this.dropdown).forEach(counter => counter.value = 0);
	}

	checkTotalMaxValue = (totalMaxValue) => {
		if (totalMaxValue){
			if (this.getTotalCounter() === totalMaxValue){
				addButtonsDisabled(this.dropdown);
				this.opts.isAddButtonsDisabled = true;
			}else {
				if (this.opts.isAddButtonsDisabled) {
					addButtonsActived(this.dropdown);
				}
			}
		}
	}

	checkMinItemValue = (minItemValue, previousValue, currentValue, button) => {
		if (minItemValue){
			if (previousValue === minItemValue) {	
				subtractButtonActived(getSubtractButton(button));
			}
			if (currentValue === minItemValue) {
				subtractButtonDisabled(button);
			}
		}
	}

  checkDisableClearButton() {
    let buttons = this.$dropdown.querySelectorAll('.button__input_link');

    buttons = Array.prototype.slice.call(buttons);
    let clearButton = buttons.find(
      (button) => button.value === this.opts.clearFooterButtonName
    );

    if (this.selectedItemsIsEmty()) {
      clearButton.setAttribute('disabled', '');
    } else {
      if (clearButton.hasAttribute('disabled')) {
        clearButton.removeAttribute('disabled');
      }
    }
  }

	footerButtonClicked = (e) => {
    if (clearButtonClicked(e)) {
			this.clearItemsCounter();
			this.trigger(consts.changeSelectedItems);
    }
		if (applayButtonClicked(e)) {
			this.hide();
			this.trigger(consts.applySelectedItems, this.selectedItems);
		}
  };

  format(items) {
    let resultString = '';
    if (this.opts.inputFormat) {
      let inputFormat = this.opts.inputFormat;
      let itemTitles = Object.keys(inputFormat);

      let formatedItem = [];
      let itemToString = '';

      itemTitles.forEach((item) => (formatedItem[item] = ''));

      itemTitles.forEach((item) => {
        if (item === 'mergeItems') {
          let mergeValue = 0;

          this.opts.mergeItems.forEach((e) => (mergeValue += items[e]));

          itemToString = this.switchResult(mergeValue, inputFormat[item]);
        } else {
          itemToString = this.switchResult(items[item], inputFormat[item]);
        }
        formatedItem[item] = itemToString;
      });

      itemTitles.forEach((item) => {
        if (formatedItem[item]) {
          if (resultString) {
            resultString += ', ' + formatedItem[item];
          } else {
            resultString = formatedItem[item];
          }
        }
      });

      return resultString + '   ';
    }

    Object.keys(this.selectedItems).forEach((item) => {
      let itemValue = this.selectedItems[item];

      if (itemValue !== 0) {
        if (resultString) {
          resultString += ', ' + item + ': ' + itemValue;
        } else {
          resultString = item + ': ' + itemValue;
        }
      }
    });

    return resultString + '   ';
  }

  switchResult(itemValue, itemName) {
    let result = '';

    switch (itemValue) {
      case 0:
        result = '';
        break;
      case 1:
        result = itemValue + ' ' + itemName[0];
        break;
      case 2:
      case 3:
      case 4:
        result = itemValue + ' ' + itemName[1];
        break;

      default:
        result = itemValue + ' ' + itemName[2];
    }
    return result;
  }

	itemButtonClickedTrigger = (button, counter, itemName) => {
		this.trigger(consts.itemButtonClicked, button, counter, itemName)
	};
}

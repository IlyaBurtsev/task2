

import { deepMerge, getElement, showWarning } from '../../../utils/utils';

import { bindObserverMetods } from '../../../utils/observerMetods';
import { addButtonsActived, addButtonsDisabled, getCountersItemName, getSubtractButton, getItemNameWhenAddButtonClicked, itemButtonClicked, subtractButtonActived, subtractButtonDisabled } from '../__dropdown-item/dropdown-item';
import { activeClearButton, applayButtonClicked, clearButtonClicked, disableClearButton, getAllItemsCounter, switchToClosedState, switchToOpenState } from '../dropdown';

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
	minItemValue: 0,
	totalMaxValue: '',
  ItemsRequiredMessage: '',
  footerButtonActived: false,
  clearFooterButtonName: 'очистить',
  applyFooterButtonName: 'применить',
};

export class Dropdown {
  constructor(dropdown, options) {
    this.dropdown = dropdown;

		if(!this.dropdown) {
			showWarning('Dropdown element not found in DOM!');
			return;
		}
		if(!this.getInput()) {
			showWarning('Dropdown element does not exist INPUT element!');
			return;
		}
		
    this.opts = deepMerge({}, optionDefault, options);

    this.inited = false;
    this.visible = false;

    this.init();
  }

  init() {
    bindObserverMetods(this);

		this.bindEvents();

    if (this.opts.visible) {
      this.show();
    }
   
    if (this.opts.elementReadonly) {
      this.getInput().setAttribute('readonly', '');
      this.elementReadonly = true;
    }

		this.isAddButtonsDisabled = false;
		this.isSubtractButtonDisabled = true;

		this.selectedItems = new Map();
		this.initSelectedItems();
		
    this.inted = true;
  }

	initSelectedItems = () => {
		//TODO доработать!
		getAllItemsCounter(this.dropdown).forEach(counter => this.selectedItems.set(getCountersItemName(counter), counter.value));
	}

  bindEvents() {
    this.getInput().addEventListener('focus', this.onFocus);
    this.getInput().addEventListener('blur', this.onBlur);
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
    this.getInput(this.dropdown).focus();
  };

	handleClickItemButton = (e) => {
		this.addButtonClicked(e);
		this.subtractButtonClicked(e);
  };
	
	// handleClickFooterButton = (e) => {
	// 	this.footerButtonClicked(e)
	// }

	//  Subscription events with observer methods
  // -------------------------------------------------

  onChangeSelectedItems = (itemName, previousValue) => {
    this.updateInputValueView();
		this.checkMinItemValue(itemName, previousValue);

    // if (this.opts.footerButtonActived) {
    //   this.checkDisableClearButton();
    // }
  };

	
  // -------------------------------------------------

	getInput = () => {
		return getElement('INPUT', this.dropdown);
	}

  show() {
		this.dropdown.addEventListener('click', this.handleClickItemButton);
		this.on(consts.changeSelectedItems, this.onChangeSelectedItems);
		this.attachFooterButtonListener();

    this.visible = true;
		switchToOpenState(this.dropdown);
  }

  hide() {
		this.dropdown.removeEventListener('click', this.handleClickItemButton);
		this.off(consts.changeSelectedItems, this.onChangeSelectedItems);
		this.removeFooterButtonListener();

		this.getInput().blur();

    this.visible = false;
    switchToClosedState(this.dropdown);
  }

	addButtonClicked = (e) => {
		const itemName = getItemNameWhenAddButtonClicked(e);
		if(itemName) {
			const previousValue = this.selectedItems.get(itemName);
			this.selectedItems.set(itemName, (this.selectedItems.get(itemName)+1));
			this.trigger(consts.changeSelectedItems, itemName, previousValue);
		}
	};

	subtractButtonClicked = (e) => {
		const itemName = getItemNameWhenAddButtonClicked(e);
		if(itemName) {
			const previousValue = this.selectedItems.get(itemName);
			this.selectedItems.set(itemName, (this.selectedItems.get(itemName)-1));
			this.trigger(consts.changeSelectedItems, itemName, previousValue);
		}
	};

  updateInputValueView = () => {
    let requiredValues = [];

    let requiredItems = this.opts.ItemsRequired;

    if (requiredItems) {
      this.selectedItems.forEach((item) => {
        if (requiredItems.includes(item)) {
          requiredValues.push(this.selectedItems.get(item));
        }
      });

      if (requiredValues.includes(0)) {
        if (this.selectedItemsIsEmty()) {
          this.getInput(this.dropdown).value = '';
        } else {
          this.getInput(this.dropdown).value = this.opts.ItemsRequiredMessage;
        }
      } else {
        this.getInput(this.dropdown).value = this.format(this.selectedItems);
      }
    } else {
      this.getInput(this.dropdown).value = this.format(this.selectedItems);
    }
  };
	updateCounterView = (itemName) => {
		
	}

	getTotalCounter(){
		let totalCounter = 0;
		getAllItemsCounter(this.dropdown).forEach(counter => totalCounter+= Number(counter.value));
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
		this.selectedItems.forEach((itemValue, itemName) => this.selectedItems.set(itemName, 0));
		this.trigger(consts.changeSelectedItems);
	}

	checkTotalMaxValue = (totalMaxValue) => {
		if (totalMaxValue){
			if (this.getTotalCounter() === totalMaxValue){
				addButtonsDisabled(this.dropdown);
				this.isAddButtonsDisabled = true;
			}else {
				if (this.isAddButtonsDisabled) {
					addButtonsActived(this.dropdown);
				}
			}
		}
	}

	checkMinItemValue = (itemName, previousValue) => {
		
	}

  checkDisableClearButton() {
    
    if (this.selectedItemsIsEmty()) {
      disableClearButton(this.dropdown);
			this.isClearButtonDisabled = true;
    } else {
      if (this.isClearButtonDisabled) {
        activeClearButton(this.dropdown);
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

          this.opts.mergeItems.forEach((mergeItemNames) => (mergeValue +=Number(items.get(mergeItemNames))));

          itemToString = this.switchResult(mergeValue, inputFormat[item]);
        } else {
          itemToString = this.switchResult(Number(items.get(item)), inputFormat[item]);
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

      return resultString;
    }
    this.selectedItems.forEach((itemValue, itemName) => {
      if (itemValue !== 0) {
        if (resultString) {
          resultString += ', ' + itemName + ': ' + itemValue;
        } else {
          resultString = itemName + ': ' + itemValue;
        }
      }
    });

    return resultString;
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

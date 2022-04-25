

import { deepMerge, showWarning } from '../../../../utils/utils';

import { bindObserverMetods } from '../../../../utils/observerMetods';
import { getItemNameWhenAddButtonClicked, disableAddButton, activeAddButton, disableSubtractButton, activeSubtractButton, updateCounterView, getItemNameWhenubtractButtonClicked } from '../__dropdown-item/dropdown-item';
import { activeClearButton, applayButtonClicked, clearButtonClicked, disableClearButton, getInput, getSelectedItems, switchToClosedState, switchToOpenState } from '../dropdown_item-quantity';

export const consts = {
  changeSelectedItem: 'cangeSelectedItem',
  applySelectedItems: 'applySelectedItems',
	itemButtonClicked: 'itemButtonClicked',
};

const optionDefault = {
	minItemValue: 0,
	totalMaxValue: '',
  itemsRequiredMessage: '',
  footerButtonActived: false,
};

export class Dropdown {
  constructor(dropdown, options) {
    this.dropdown = dropdown;

		if(!this.dropdown) {
			showWarning('Dropdown element not found in DOM!');
			return;
		}
		if(!getInput(this.dropdown)) {
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
      getInput(this.dropdown).setAttribute('readonly', '');
      this.elementReadonly = true;
    }

		this.isAddButtonsDisabled = false;
		this.isSubtractButtonDisabled = true;

		this.initSelectedItems();
		
    this.inted = true;
  }

	initSelectedItems = () => {
		this.selectedItems = getSelectedItems(this.dropdown);
		for (const itemName of this.selectedItems.keys()) {
			this.trigger(consts.changeSelectedItem, itemName);
		}
	}

  bindEvents() {
    getInput(this.dropdown).addEventListener('focus', this.onFocus);
    getInput(this.dropdown).addEventListener('blur', this.onBlur);
    this.dropdown.addEventListener('mousedown', this.onMouseDown);
    this.dropdown.addEventListener('mouseup', this.onMouseUp); 
		this.on(consts.changeSelectedItem, this.onChangeSelectedItem);
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
		this.addButtonClicked(e);
		this.subtractButtonClicked(e);
  };
	
	handleClickFooterButton = (e) => {
		this.footerButtonClicked(e)
	}

  onChangeSelectedItem = (itemName, previousValue) => {
		const {footerButtonActived, callback: onSelectItems} = this.opts;
    this.updateInputView();
		updateCounterView(itemName, this.selectedItems.get(itemName), this.dropdown)
		this.checkMinItemValue(itemName, previousValue);
		this.checkTotalMaxValue();

    if (footerButtonActived) {
      this.checkDisableClearButton();
    }
		if (typeof onSelectItems === 'function') {
			onSelectItems(this.selectedItems);
		}
  };

	
  // -------------------------------------------------

  show() {
		this.dropdown.addEventListener('click', this.handleClickItemButton);
		this.on(consts.changeSelectedItem, this.onChangeSelectedItem);
		this.attachFooterButtonListener();

    this.visible = true;
		switchToOpenState(this.dropdown);
  }

  hide() {
		this.dropdown.removeEventListener('click', this.handleClickItemButton);
		this.off(consts.changeSelectedItem, this.onChangeSelectedItem);
		this.removeFooterButtonListener();

		getInput(this.dropdown).blur();

    this.visible = false;
    switchToClosedState(this.dropdown);
  }

	addButtonClicked = (e) => {
		const itemName = getItemNameWhenAddButtonClicked(e);
		if(itemName) {
			const previousValue = this.selectedItems.get(itemName);
			this.selectedItems.set(itemName, (this.selectedItems.get(itemName)+1));
			this.trigger(consts.changeSelectedItem, itemName, previousValue);
		}
	};

	subtractButtonClicked = (e) => {
		const itemName = getItemNameWhenubtractButtonClicked(e);
		if(itemName) {
			const previousValue = this.selectedItems.get(itemName);
			this.selectedItems.set(itemName, (this.selectedItems.get(itemName)-1));
			this.trigger(consts.changeSelectedItem, itemName, previousValue);
		}
	};

  updateInputView = () => {
    let requiredValues = [];
		let input = getInput(this.dropdown);

    let requiredItems = this.opts.itemsRequired;

    if (requiredItems) {
			for (let item of this.selectedItems.keys()) {
				if (requiredItems.includes(item)) {
          requiredValues.push(this.selectedItems.get(item));
        }
			}
      if (requiredValues.includes(0)) {
        if (this.selectedItemsIsEmty()) {
					
					
          input.value = '';
        } else {
          input.value = this.opts.itemsRequiredMessage;
        }
      } else {
        input.value = this.format(this.selectedItems);
      }
    } else {
      input.value = this.format(this.selectedItems);
    }
  };


	getTotalCounter(){
		let totalCounter = 0;
		for (let counter of this.selectedItems.values()){
			totalCounter +=counter;
		}
		return totalCounter;
	} 

  selectedItemsIsEmty() {
    if(this.getTotalCounter() == 0){
			return true;
		}
		return false;
  }

	clearItemsCounter = () => {
		for (let itemName of this.selectedItems.keys()){
			this.selectedItems.set(itemName, 0);
			this.trigger(consts.changeSelectedItem, itemName);
		}
	}

	checkTotalMaxValue = () => {
		if (this.opts.totalMaxValue){
			if (this.getTotalCounter() === this.opts.totalMaxValue){
				for (let itemName of this.selectedItems.keys()) {
					disableAddButton(itemName, this.dropdown);
				}
				this.isAddButtonsDisabled = true;
			}else {
				if (this.isAddButtonsDisabled) {
					for (let itemName of this.selectedItems.keys()) {
						activeAddButton(itemName, this.dropdown);
					}
				}
			}
		}
	};

	checkMinItemValue = (itemName, previousValue) => {
		if (this.selectedItems.get(itemName) == 0){
			disableSubtractButton(itemName, this.dropdown);
			return;
		}
		if (previousValue == 0){
			activeSubtractButton(itemName, this.dropdown);
			return;
		}
		if (!previousValue) {
			if(this.selectedItems.get(itemName)>0) {
				activeSubtractButton(itemName, this.dropdown);
			}
		}
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

          this.opts.mergeItems.forEach((mergeItemNames) => (mergeValue +=items.get(mergeItemNames)));

          itemToString = this.switchResult(mergeValue, inputFormat[item]);
        } else {
          itemToString = this.switchResult(items.get(item), inputFormat[item]);
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
}

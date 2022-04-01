import './dropdown.scss'
import '../_dropdown/dropdown-item/dropdown-item.scss'
import './_filter-date/dropdown_filter-date'
import './_date/dropdown_date'
import './_guests/dropdown_guests'
import './_comfort/dropdown_comfort'

import {
	deepMerge,
	getElement,
} from '../../../utils/utils';

import { bindObserverMetods } from '../../../utils/observerMetods'
import { DropdownItem } from './dropdown-item/dropdown-item'


export const consts = {
	eventChangeSelectedItems: 'cangeSelectedItems',
	eventApplySelectedItems: 'applySelectedItems',

	dropdownShowClassName: 'dropdown__expand-container_show',
}

const optionDefault = {
	inline: false,
	showEvent: 'focus',
	ItemsRequiredMessage: '',
	footerButtonActived: false,
	clearFooterButtonName: 'очистить',
	applyFooterButtonName: 'применить'
}


export class Dropdown {
	constructor(bindElement, options) {
		
		this.$container = getElement(bindElement);
		
		if (!this.$container) {
			throw new Error('Dropdown cannot find container with: "' + bindElement+'"')
			
		};
		if (this.$container.nodeName === 'INPUT') {
			this.$input = this.$container;
		} else {
			this.$input = this.$container.querySelector('input');
			if (!this.$input) {
				throw new Error('Expected <input> element to output data.')
			}
		}

		this.$dropdown = this.$container.lastElementChild
		
		this.opts = deepMerge({}, optionDefault, options);

		if (this.$input.nodeName === 'INPUT') {
			this.elIsInput = true;
		}

		this.inited = false;
		this.visible = false;
		this.elementReadonly = this.$input.getAttribute('readonly');

		this.init();
	}

	init() {

		bindObserverMetods(this);

		this.bindSubEvents();

		this.dropdownItem = new DropdownItem(this);


		if (this.elIsInput ) {
			
				this.bindEvents();
				
		}
		
		if (this.opts.inline || !this.elIsInput) {
			this.$container.classList.add('dropdown__container_inline');
	  }

		if (this.opts.visible && !this.opts.inline) {
			this.show();
		}
		if (this.opts.selectedItems) {

			this.selectedItems = this.opts.selectedItems;
			this.trigger(consts.eventChangeSelectedItems, Array.prototype.slice.call(this.$dropdown.querySelectorAll('.dropdown-item__counter')))
		} else {
			this.selectedItems = this.initSelectedItem();
		}

		if (this.opts.footerButtonActived) {

			this.attachFooterButtonListener();
			this.checkDisableClearButton();
		}
		if (this.opts.elementReadonly) {
			this.$input.setAttribute('readonly', '')
			this.elementReadonly = true;
		}

		this.inted = true;

	}


	initSelectedItem() {
		
		let items = this.$dropdown.querySelectorAll('.dropdown-item__counter');

		items = Array.prototype.slice.call(items);
		items.map(item => items[item.getAttribute("counter")] = 0);
		items.splice(0, 3);

		return items;
	}

	bindEvents() {
		this.$input.addEventListener(this.opts.showEvent, this.onFocus);
		this.$input.addEventListener('blur', this.onBlur);
		this.$dropdown.addEventListener('mousedown', this.onMouseDown);
		this.$dropdown.addEventListener('mouseup', this.onMouseUp);
		this.$dropdown.addEventListener('click', this.onClickItemButton);
	}

	bindSubEvents() {
		this.on(consts.eventChangeSelectedItems, this.onChangeSelectedItems);
	}
	attachFooterButtonListener() {
		this.$dropdown.addEventListener('click', this.onClickFooterButton);
	}



	//  Subscription events
	// -------------------------------------------------

	onFocus = (e) => {
		if (!this.visible) {
			this.show();
		}
	}

	onBlur = (e) => {
		if (!this.inFocus && this.visible) {
			this.hide();
		}
	}

	onMouseDown = (e) => {
		this.inFocus = true;
	}

	onMouseUp = (e) => {
		this.inFocus = false;
		this.$input.focus();
	}

	onClickItemButton = (e) => {
		this.handleClickItemButton(e);
	}

	onClickFooterButton = (e) => {
		this.handleClickFooterButton(e);
	}

	onChangeSelectedItems = (items) => {
		this.updateInputValueView();
		this.updateItemCounterView(items);

		if (this.opts.footerButtonActived) {
			this.checkDisableClearButton();
		}
	}

	// -------------------------------------------------


	show() {
		this.$container.classList.add(consts.dropdownShowClassName);
		this.visible = true;
	}

	hide() {
		this.$input.blur();
		this.visible = false;
		this.$container.classList.remove(consts.dropdownShowClassName);
	}

	handleClickItemButton = (e) => {

		if (e.target.classList.contains('dropdown-item__add-button')) {

			let itemCount = e.target.previousElementSibling.getAttribute('counter')

			if (!this.selectedItems[itemCount]) {
				this.selectedItems[itemCount] = 1;
			} else {
				this.selectedItems[itemCount]++;
			}

			this.trigger(consts.eventChangeSelectedItems, e.target.previousElementSibling);
		}

		if (e.target.classList.contains('dropdown-item__sub-button')) {

			let itemCount = e.target.nextElementSibling.getAttribute('counter');

			if (this.selectedItems[itemCount] > 0) {
				this.selectedItems[itemCount]--;
			}

			this.trigger(consts.eventChangeSelectedItems, e.target.nextElementSibling);
		}


	}

	handleClickFooterButton = (e) => {
		if (e.target.classList.contains('button__input_link')) {

			if (e.target.value === this.opts.clearFooterButtonName) {
				let keys = Object.keys(this.selectedItems);

				keys.forEach(item => this.selectedItems[item] = 0);

				this.trigger(consts.eventChangeSelectedItems, Array.prototype.slice.call(this.$dropdown.querySelectorAll('.dropdown-item__counter')))
			}

			if (e.target.value === this.opts.applyFooterButtonName) {
				this.hide();
				this.trigger(consts.eventApplySelectedItems, this.selectedItems);
			}
		}

	}

	updateInputValueView = () => {
		let requiredValues = [];

		let requiredItems = this.opts.ItemsRequired;

		if (requiredItems) {

			Object.keys(this.selectedItems).forEach(item => {
				if (requiredItems.includes(item)) {
					requiredValues.push(this.selectedItems[item])
				}
			})

			if (requiredValues.includes(0)) {
				if (this.selectedItemsIsEmty()) {
					this.$input.value = '';
				} else {
					this.$input.value = this.opts.ItemsRequiredMessage;
				}
			} else {

				this.$input.value = this.format(this.selectedItems);
			}
		} else {

			this.$input.value = this.format(this.selectedItems);
		}

	}

	selectedItemsIsEmty() {
		let emtyItems = (Object.values(this.selectedItems)).filter(val => val === 0);
		if (emtyItems.length === Object.values(this.selectedItems).length) {
			return true;
		}
	}

	updateItemCounterView = (items) => {
		if (Array.isArray(items)) {
			items.forEach(item => item.innerHTML = this.selectedItems[item.getAttribute('counter')])
		} else {
			items.innerHTML = this.selectedItems[items.getAttribute('counter')];
		}
	}

	checkDisableClearButton() {

		let buttons = this.$dropdown.querySelectorAll('.button__input_link');

		buttons = Array.prototype.slice.call(buttons);
		let clearButton = buttons.find(button => button.value === this.opts.clearFooterButtonName);

		if (this.selectedItemsIsEmty()) {
			clearButton.setAttribute('disabled', '')
		} else {
			if (clearButton.hasAttribute('disabled')) {
				clearButton.removeAttribute('disabled');
			}
		}

	}


	format(items) {
		let resultString = ''
		if (this.opts.inputFormat) {

			let inputFormat = this.opts.inputFormat;
			let itemTitles = Object.keys(inputFormat);

			let formatedItem = [];
			let itemToString = '';

			itemTitles.forEach(item => formatedItem[item] = '');

			itemTitles.forEach(item => {
				if (item === 'mergeItems') {
					let mergeValue = 0;

					this.opts.mergeItems.forEach(e => mergeValue += items[e]);

					itemToString = this.switchResult(mergeValue, inputFormat[item]);
				} else {
					itemToString = this.switchResult(items[item], inputFormat[item]);
				}
				formatedItem[item] = itemToString;

			})



			itemTitles.forEach(item => {
				if (formatedItem[item]) {
					if (resultString) {
						resultString += ', ' + formatedItem[item];
					} else {
						resultString = formatedItem[item];
					}
				}
			})

			return resultString + '   ';
		}

		(Object.keys(this.selectedItems)).forEach(item => {
			let itemValue = this.selectedItems[item];

			if (itemValue !== 0) {
				if (resultString) {
					resultString += ', ' + item + ': ' + itemValue;
				} else {
					resultString = item + ': ' + itemValue;
				}
			}
		})

		return resultString + '   ';

	}

	switchResult(itemValue, itemName) {
		let result = '';

		switch (itemValue) {
			case 0: result = ''
				break;
			case 1: result = itemValue + ' ' + itemName[0];
				break;
			case 2:
			case 3:
			case 4: result = itemValue + ' ' + itemName[1];
				break;

			default: result = itemValue + ' ' + itemName[2];
		}
		return result;
	}



}


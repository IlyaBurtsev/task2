
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



const consts = {
	eventChangeSelectedItems: 'cangeSelectedItems',

	dropdownShowClassName: 'dropdown__expand-container_show'
}

const optionDefault = {
	inline: false,
	showEvent: 'focus',

}


class Dropdown {
	constructor(bindElement, options) {
		this.element = getElement(bindElement);

		if (!this.element) return;

		this.dropdown = this.element.nextSibling

		this.opts = deepMerge({}, optionDefault, options);

		if (this.element.nodeName === 'INPUT') {
			this.elIsInput = true;
		}

		this.inited = false;
		this.visible = false;

		this.focusDate = false;

		bindObserverMetods(this);

		this.init()



	}

	init() {

		this.bindSubEvents();

		if (this.elIsInput) {

			this.bindEvents();
		}

		if (this.opts.visible) {
			this.show();
		}
		if (this.opts.selectedItems) {
			this.selectedItems = opts.selectedItems;
		} else {
			this.selectedItems = this.initSelectedItem();
		}

	}

	initSelectedItem() {
		let items = this.dropdown.querySelectorAll('.dropdown-item__counter');
		
		items = Array.prototype.slice.call(items);
		items.map(item => items[item.getAttribute("counter")] = 0);
		items.splice(0, 3);

		return items;
	}

	bindEvents() {
		this.element.addEventListener(this.opts.showEvent, this.onFocus);
		this.element.addEventListener('blur', this.onBlur);
		this.dropdown.addEventListener('mousedown', this.onMouseDown);
		this.dropdown.addEventListener('mouseup', this.onMouseUp);
		this.dropdown.addEventListener('click', this.onClickItemButton);
	}

	bindSubEvents() {
		this.on(consts.eventChangeSelectedItems, this.onChangeSelectedItems);
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
		this.element.focus();
	}

	onClickItemButton = (e) => {
		this.handleClick(e);
	}

	onChangeSelectedItems = (item, itemCounter) => {
		this.updateInputValueView();
		this.updateItemCounterView(item, itemCounter);
	}

	// -------------------------------------------------


	show() {
		this.element.classList.add(consts.dropdownShowClassName);
		this.visible = true;
	}

	hide() {
		this.visible = false;
		this.element.classList.remove(consts.dropdownShowClassName);
	}

	handleClick = (e) => {

		if (e.target.classList.contains('dropdown-item__add-button')) {

			let itemCount = e.target.previousSibling.getAttribute('counter')

			if (!this.selectedItems[itemCount]) {
				this.selectedItems[itemCount] = 1;
			} else {
				this.selectedItems[itemCount]++;
			}

			this.trigger(consts.eventChangeSelectedItems, e.target.previousSibling, this.selectedItems[itemCount]);
		}

		if (e.target.classList.contains('dropdown-item__sub-button')) {

			let itemCount = e.target.nextSibling.getAttribute('counter')


			if (this.selectedItems[itemCount] > 0) {
				this.selectedItems[itemCount]--;
			}

			this.trigger(consts.eventChangeSelectedItems, e.target.nextSibling, this.selectedItems[itemCount]);
		}
		

	}
	updateInputValueView = () => {
		this.element.value = Object.values(this.selectedItems);

	}

	updateItemCounterView = (item, itemCounter) => {
		item.innerHTML = itemCounter;
	}



}

new Dropdown('.dropdown__input_guests', {
	visible: true,
})

new Dropdown('.dropdown__input_comfort')

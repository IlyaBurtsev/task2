
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

		bindObserverMetods(this);

		this.inited = false;
		this.visible = false;
		this.dropdownItem = new DropdownItem(this);

		this.focusDate = false;



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

		this.element.value = this.format(this.selectedItems);

	}

	updateItemCounterView = (item, itemCounter) => {
		item.innerHTML = itemCounter;
	}
	format(items) {
		let itemToString = '';
		if (this.opts.inputFormat) {
			let inputFormat = this.opts.inputFormat
			let itemTitles = Object.keys(inputFormat);
			let test =[]
			itemTitles.forEach(item => test[item] = '');
			
			itemTitles.forEach(item => {
				

				if (item === 'mergeItems') {
					let mergeValue = 0;
					
					this.opts.mergeItems.forEach(e => mergeValue += items[e]);

					console.dir(mergeValue)
					itemToString = this.switchResult(mergeValue, inputFormat[item]);
				}else{
					itemToString = this.switchResult(items[item], inputFormat[item]);
				}
				test[item] = itemToString;

			})
			let resultString = '';
			test.forEach(item => {
				
			})
			console.log(test)
			return itemToString;
		}
		return 'ssfgshgdslghusfh'
		// let mergeListTitle =['взрослые', 'дети'];
		// let mergeValue =0;
		// mergeListTitle.forEach(item => mergeValue += items[item] );
		// let mergeName = ['гость', 'гостя', 'гостей' ]
		// let result =''
		// let itemName = ['младенец', 'младенеца', 'младенецев'];
		// let itemTitle = 'младенцы';

		// switch (mergeValue){ 
		// 	case 0: result=''
		// 	break;
		// 	case 1: result = mergeValue+' '+ mergeName[0];
		// 	break;
		// 	case 2:
		// 	case 3:
		// 	case 4: result = mergeValue+' '+ mergeName[1];
		// 	break;

		// 	default: result = mergeValue+' '+ mergeName[2];
		// }
		// return result;

		// let n1 =items['взрослые']+items["дети"];
		// let inputString1 = n1 + ' гостя';
		// let inputString2 = inputString1 + ', ' +items["младенцы"]+ ' младенца';
		// return inputString2;
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
export let mergeTitles = ['взрослые', 'дети'];
new Dropdown('.dropdown__input_guests', {
	visible: true,
	mergeItems: ['взрослые', 'дети'],
	inputFormat: { mergeItems:['гость', 'гостя', 'гостей' ], 'младенцы':['младенец', 'младенеца', 'младенецев']}
})

new Dropdown('.dropdown__input_comfort')

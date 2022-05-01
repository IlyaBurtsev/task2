import './dropdown_item-quantity.scss';
import './__dropdown-item/dropdown-item.scss';
import { Dropdown } from './Classes/Dropdown';

import {
  addClass,
  getElement,
  getElements,
  removeClass,
} from '../../../utils/utils';


export const getInput = (container) => {
	return getElement('.js-input-field__input_for-items-dropdown', container);
}
export const switchToOpenState = (dropdown) => {
  addClass(dropdown, 'dropdown__container_item-quantity_open');
};

export const switchToClosedState = (dropdown) => {
  removeClass(dropdown, 'dropdown__container_item-quantity_open');
};

export const getSelectedItems = (dropdown) => { 
	let selectedItems = new Map;
	getElements('.js-dropdown-item__counter', dropdown).forEach(counter => {
		selectedItems.set(counter.getAttribute('item-name'), Number(counter.value));
	});
	return selectedItems;
}

export const clearButtonClicked = (e) => {
	if (e.target.closest('.js-dropdown__clear-button')) {
		return true;
	}
	return false;
}

export const disableClearButton = (dropdown) => {
	getElement('.js-dropdown__clear-button', dropdown).classList.add('dropdown__clear-button_disasbled');
}

export const activeClearButton = (dropdown) => {
	getElement('.js-dropdown__clear-button', dropdown).classList.remove('dropdown__clear-button_disasbled');
}

export const applayButtonClicked = (e) => {
	if (e.target.closest('.js-dropdown__apply-button')) {
		return true;
	}
	return false;
}

export const swithToInline = (dropdown) => {
	addClass(dropdown, 'dropdown__container_item-quantity_inline')
}



export const initQuantityDropdown = (bindElement, callbackFunc) => {
	const footerButtonActive = bindElement.classList.contains('footer-button-active');
	const visible = bindElement.classList.contains('dropdown__container_item-quantity_open');
	const inline = bindElement.classList.contains('dropdown__container_item-quantity_inline');
	let dropdownSettings = '';

	if (footerButtonActive) {
		dropdownSettings = {
			mergeItems: ['взрослые', 'дети'],
			inputFormat: { mergeItems: ['гость', 'гостя', 'гостей'], 'младенцы': ['младенец', 'младенца', 'младенцев'] },
			itemsRequired: ['взрослые'],
			itemsRequiredMessage: 'Без взрослых не заселяем.',
			totalMaxValue: 20,
			footerButtonActived: true,
		}
	}else {
		dropdownSettings = {
			inputFormat: { 'спальни': ['спальня', 'спальни', 'спален'], 
			'кровати': ['кровать', 'кровати', 'кроватей'], 
			'ванные комнаты': ['ванная комната', 'ванных комнаты', 'ванных комнат'] },
		}
	}

	new Dropdown(bindElement, {
		visible: visible,
		inline: inline,
		...dropdownSettings,
		onSelectItems(selectedItems) {
			if(callbackFunc) {
				callbackFunc(selectedItems);
			}
		}
	})
}
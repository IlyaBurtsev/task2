
import './dropdown.scss'

import { getElement, getElements } from '../../utils/utils';
import { initDateDropdown } from './_date-picker/dropdown_date-picker';
import { initQuantityDropdown } from './_item-quantity/dropdown_item-quantity';

const initCurrentType = (dropdown, callbackFunc) => {
	if (dropdown.classList.contains('dropdown__container_date-picker')) {
		initDateDropdown(dropdown, callbackFunc);
	}
	if (dropdown.classList.contains('dropdown__container_item-quantity')) {
		initQuantityDropdown(dropdown, callbackFunc);
	}
}

export const initDropdowns = (elementContainer) => {
	getElements('.js-dropdown__container', elementContainer).forEach(dropdown => initCurrentType(dropdown));
}

export const initDropdown = (elementContainer, callbackFunc) => {
	const dropdown = getElement('.js-dropdown__container', elementContainer);
	initCurrentType(dropdown, callbackFunc);
}


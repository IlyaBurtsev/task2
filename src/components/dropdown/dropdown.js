import './dropdown.scss'
import '../../component-templates/dropdown-template/dropdown-template'

import { getElement, getElements } from '../../utils/utils';
import { initDateDropdown } from './_date-picker/dropdown_date-picker';
import { initQuantityDropdown } from './_item-quantity/dropdown_item-quantity';

const initCurrentType = (dropdown, callbackFunc, startValues, quantityDropdowns) => {
	if (dropdown.classList.contains('dropdown__container_date-picker')) {
		initDateDropdown(dropdown, callbackFunc);
	}
	if (dropdown.classList.contains('dropdown__container_item-quantity')) {
		const plugin = initQuantityDropdown(dropdown, callbackFunc, startValues);
		if(Array.isArray(quantityDropdowns)){
			quantityDropdowns.push(plugin)
		}
	}
}

const initDropdowns = (elementContainer, quantityDropdowns) => {
	getElements('.js-dropdown__container', elementContainer).forEach(dropdown => initCurrentType(dropdown, null, null, quantityDropdowns));
}

const initDropdown = (elementContainer, callbackFunc, startValues) => {
	const dropdown = getElement('.js-dropdown__container', elementContainer);
	initCurrentType(dropdown, callbackFunc, startValues);
}

export {initDropdown, initDropdowns}


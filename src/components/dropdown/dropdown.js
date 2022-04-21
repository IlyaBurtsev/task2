import './dropdown.scss';
import './__dropdown-item/dropdown-item.scss';
import '../button/button'
// import '../_filter-date/dropdown_filter-date';
// import '../_date/dropdown_date';
import './_guests/dropdown_guests';
// import '../_comfort/dropdown_comfort';
import {
  addClass,
  getElement,
  getElements,
  removeClass,
} from '../../utils/utils';
import { getItemCounterSelector} from './__dropdown-item/dropdown-item';

export const getInput = (container) => {
	return getElement('.js-input-field__input_for-dropdown', container);
}
export const switchToOpenState = (dropdown) => {
  addClass(dropdown, 'dropdown__container_open');
};

export const switchToClosedState = (dropdown) => {
  removeClass(dropdown, 'dropdown__container_open');
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




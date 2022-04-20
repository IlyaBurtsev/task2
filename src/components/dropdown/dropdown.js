import './dropdown.scss';
import './__dropdown-item/dropdown-item.scss';
// import '../_filter-date/dropdown_filter-date';
// import '../_date/dropdown_date';
// import '../_guests/dropdown_guests';
// import '../_comfort/dropdown_comfort';
import {
  addClass,
  getElement,
  getElements,
  removeClass,
} from '../../utils/utils';
import { getItemCounterSelector} from './__dropdown-item/dropdown-item';

export const getInput = (dropdown) => {
  return getElement('.js-input_for-dropdown', dropdown);
 
};

export const switchToOpenState = (dropdown) => {
  addClass(dropdown, 'dropdown__container_open');
};

export const switchToClosedState = (dropdown) => {
  removeClass(dropdown, 'dropdown__container_open');
};

export const getAllItemsCounter = (dropdown) => {
	return getElements(getItemCounterSelector, dropdown);
}

export const clearButtonClicked = (e) => {
	if (e.target.closest.classList.contains('dropdown__clear-button')) {
		return true;
	}
	return false;
}

export const desableClearButton = (dropdown) => {
	
}

export const applayButtonClicked = (e) => {
	if (e.target.closest.classList.contains('dropdown__apply-button')) {
		return true;
	}
	return false;
}




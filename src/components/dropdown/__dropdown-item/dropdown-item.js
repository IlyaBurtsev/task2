import {
  addClass,
  getElement,
  getElements,
  removeClass,
} from '../../../utils/utils';

export const getItemNameWhenAddButtonClicked = (e) => {
  if (e.target.classList.contains('dropdown-item__add-button_active')) {
    return counter.getAttribute('itemName');
  }
	return false;
};

export const activeAddButton = (itemName, container) => {
  const button = getElement(`js-dropdown-item__add-button[itemName="${itemName}]`, container);
	button.removeAttribute('disabled');
	addClass(button, 'dropdown-item__add-button_active');
  return true;
};

export const disableAddButton = (itemName, container) => {
  const button = getElement(`js-dropdown-item__add-button[itemName="${itemName}]`, container);
  button.setAttribute('disabled', '');
  removeClass(button, 'dropdown-item__add-button_active');
  return true;
};

export const getItemNameWhenubtractButtonClicked = (e) => {
  if (e.target.classList.contains('dropdown-item__sub-button_active')) {
    return counter.getAttribute('itemName');
  }
	return false;
};

export const activeSubtractButton = (itemName, container) => {
	const button = getElement(`js-dropdown-item__sub-button[itemName="${itemName}]`, container);
  button.removeAttribute('disabled');
  addClass(button, 'dropdown-item__sub-button_active');
  return true;
};

export const disableSubtractButton = (itemName, container) => {
	const button = getElement(`js-dropdown-item__add-button[itemName="${itemName}]`, container);
  button.setAttribute('disabled', '');
  removeClass(button, 'dropdown-item__sub-button_active');
  return true;
};

export const setCounterView = (itemName, value, container) => {
	const counter = getElement(`js-dropdown-item__counter[itemName="${itemName}]`, container);
}
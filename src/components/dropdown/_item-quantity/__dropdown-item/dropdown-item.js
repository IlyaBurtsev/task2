import {
  addClass,
  getElement,
  removeClass,
} from '../../../../utils/utils';

export const getItemNameWhenAddButtonClicked = (e) => {
  if (e.target.classList.contains('dropdown-item__add-button_active')) {
    return e.target.getAttribute('item-name');
  }
	return false;
};

export const activeAddButton = (itemName, container) => {
  const button = getElement(`.js-dropdown-item__add-button[item-name="${itemName}"]`, container);
	button.removeAttribute('disabled');
	addClass(button, 'dropdown-item__add-button_active');
  return true;
};

export const disableAddButton = (itemName, container) => {
  const button = getElement(`.js-dropdown-item__add-button[item-name="${itemName}"]`, container);
  button.setAttribute('disabled', '');
  removeClass(button, 'dropdown-item__add-button_active');
  return true;
};

export const getItemNameWhenubtractButtonClicked = (e) => {
  if (e.target.classList.contains('dropdown-item__sub-button_active')) {
    return e.target.getAttribute('item-name');
  }
	return false;
};

export const activeSubtractButton = (itemName, container) => {
	const button = getElement(`.js-dropdown-item__sub-button[item-name="${itemName}"]`, container);
  button.removeAttribute('disabled');
  addClass(button, 'dropdown-item__sub-button_active');
  return true;
};

export const disableSubtractButton = (itemName, container) => {
	const button = getElement(`.js-dropdown-item__sub-button[item-name="${itemName}"]`, container);
  button.setAttribute('disabled', '');
  removeClass(button, 'dropdown-item__sub-button_active');
  return true;
};

export const updateCounterView = (itemName, value, container) => {
	const counter = getElement(`.js-dropdown-item__counter[item-name="${itemName}"]`, container);
	counter.value = value;
}
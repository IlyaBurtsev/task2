import { addClass, getElement, getElements, removeClass } from "../../../utils/utils";

export const getItemSelector = () => {
	return '.js-dropdown-item__title';
}

export const setCounter = (counter, itemName, dropdown) => {
	if (!dropdown) {
		dropdown = document;
	}
	getElement(`[itemName=${itemName}]`, dropdown).value = counter;

}

export const addButtonClicked = (e, addButtonClikedTrigger) => {
	if(e.target.classList.contains('dropdown-item__add-button_active')) {
		let counter = e.target.previousElementSibling;
		counter.value++;
		addButtonClikedTrigger(e.target, counter.value, counter.getAttribute("itemName"));
		return true;
	}
	
}

export const subtractButtonClicked = (e, subtractButtonClickedTriger) => {
	if(e.target.classList.contains('dropdown-item__sub-button_active')) {
		let counter = e.target.nextElementSibling;
		counter.value--;
		subtractButtonClickedTriger(e.target, counter.value, counter.getAttribute("itemName"));
		return true;
	}
}

export const addButtonActived = (button) => {
	button.removeAttribute("disabled", '');
	addClass(button, 'dropdown-item__add-button_active');
	return true;
}

export const subtractButtonActived = (button) => {
	button.removeAttribute("disabled", '');
	addClass(button, 'dropdown-item__sub-button_active');
	return true;
}

export const addButtonDisabled = (button) => {
	button.setAttribute("disabled", '');
	removeClass(button, 'dropdown-item__add-button_active');
	return true;
}

export const subtractButtonDisabled = (button) => {
	button.setAttribute("disabled", '');
	removeClass(button, 'dropdown-item__sub-button_active');
	return true;
}

export const getSubtractButton = (addButton) => {
	return addButton.previousElementSibling.previousElementSibling;
}

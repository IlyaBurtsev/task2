import { addClass, getElement, getElements, removeClass } from "../../../utils/utils";

// export const getItemSelector = () => {
// 	return '.js-dropdown-item__title';
// }

// export const setCounter = (counter, itemName, dropdown) => {
// 	if (!dropdown) {
// 		dropdown = document;
// 	}
// 	getElement(`[itemName=${itemName}]`, dropdown).value = counter;

// }

const addButtonClicked = (e, itemButtonClikedTrigger) => {
	if(e.target.classList.contains('dropdown-item__add-button_active')) {
		let counter = e.target.previousElementSibling;
		counter.value++;
		itemButtonClikedTrigger(e.target, counter.value, counter.getAttribute("itemName"));
		return true;
	}
	
}

const subtractButtonClicked = (e, itemButtonClickedTriger) => {
	if(e.target.classList.contains('dropdown-item__sub-button_active')) {
		let counter = e.target.nextElementSibling;
		counter.value--;
		itemButtonClickedTriger(e.target, counter.value, counter.getAttribute("itemName"));
		return true;
	}
}

export const itemButtonClicked = (e, itemButtonClickedTriger) => {
	addButtonClicked(e, itemButtonClickedTriger);
	subtractButtonClicked(e, itemButtonClickedTriger);
}

export const addButtonsActived = (container) => {
	buttons = getElements('js-dropdown-item__add-button', container);
	buttons.array.forEach(button => {
		button.removeAttribute("disabled");
		addClass(button, 'dropdown-item__add-button_active');
	});
	return true;
}

export const subtractButtonActived = (button) => {
	button.removeAttribute("disabled");
	addClass(button, 'dropdown-item__sub-button_active');
	return true;
}

export const addButtonsDisabled = (container) => {
	buttons = getElements('js-dropdown-item__add-button', container);
	buttons.array.forEach(button => {
		button.setAttribute("disabled", '');
		removeClass(button, 'dropdown-item__add-button_active');
	});
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

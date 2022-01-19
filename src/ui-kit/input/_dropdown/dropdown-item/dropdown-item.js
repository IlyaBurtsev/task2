import { consts } from "../dropdown";

export class DropdownItem {
	constructor(dropdown) {
		this.dropdown = dropdown;

		this.init();
	}
	init() {
		this.bindDropdownEvents();
	}

	bindDropdownEvents() {
		this.dropdown.on(consts.eventChangeSelectedItems, this.onChangeSubButtonView);
	}

	onChangeSubButtonView = (items) => {

		if (Array.isArray(items)) {
			items.forEach(item => {

				if ((this.dropdown.selectedItems[item.getAttribute('counter')]) > 0) {
					item.previousSibling.classList.add('dropdown-item__sub-button_active');
					item.previousSibling.removeAttribute("disabled");

				} else {
					item.previousSibling.classList.remove('dropdown-item__sub-button_active');
				}
			})
		} else {
			let subButton = items.previousSibling;
			if (this.dropdown.selectedItems[items.getAttribute('counter')] > 0) {
				if (subButton.hasAttribute("disabled")) {
					subButton.removeAttribute("disabled");
				}
				if (!subButton.classList.contains('dropdown-item__sub-button_active')) {
					subButton.classList.add('dropdown-item__sub-button_active');
				}
			} else {
				if (subButton.classList.contains('dropdown-item__sub-button_active')) {
					subButton.classList.remove('dropdown-item__sub-button_active');
					subButton.setAttribute("disabled", "disabled");
				}
			}

		}
	}
}
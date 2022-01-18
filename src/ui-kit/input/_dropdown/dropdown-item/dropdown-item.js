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

	onChangeSubButtonView(item, itemCounter) {
		let subButton = item.previousSibling;
		if (itemCounter > 0) {
			if (subButton.hasAttribute("disabled")) {
				subButton.removeAttribute("disabled")
			}
			if (!subButton.classList.contains('dropdown-item__sub-button_active')) {
				subButton.classList.add('dropdown-item__sub-button_active');
			}
		} else {
			if (subButton.classList.contains('dropdown-item__sub-button_active')) {
				subButton.classList.remove('dropdown-item__sub-button_active');
				subButton.setAttribute("disabled", "disabled")
			}
		}
	}
}
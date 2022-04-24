import InputMask from "inputmask";
export function initMask(bindElement, placeholder=''){
	InputMask("99.99.9999", {placeholder: placeholder}).mask(bindElement)
}

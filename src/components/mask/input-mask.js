import InputMask from "inputmask";
export function initMask(bindElement){
	InputMask("99.99.9999", {placeholder: 'ДД.ММ.ГГГГ'}).mask(bindElement)
}

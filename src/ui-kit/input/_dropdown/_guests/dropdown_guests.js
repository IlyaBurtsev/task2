import './dropdown_guests.scss'

import { Dropdown } from '../dropdown'

new Dropdown('.dropdown__input_guests', {
	visible: true,
	// - При объединеннии нескольких значений записывать массив в переменную [mergeItems]. Имя этой переменной использовать в качестве ключа к массиву склонений нового имени объединенных значений.
	mergeItems: ['взрослые', 'дети'],
	inputFormat: { mergeItems: ['гость', 'гостя', 'гостей'], 'младенцы': ['младенец', 'младенца', 'младенцев'] },
	ItemsRequired: ['взрослые'],
	ItemsRequiredMessage: 'Недопустимый выбор.',
	footerButtonActived: true
})
import './choose.scss'
import '../external-container/external-container'
import '../blocks/dropdown-date-block/dropdown-date-block'
import '../input/input'

import { Dropdown } from '../input/_dropdown/dropdown';

const mergeItemsForGuestsDropdown = ['взрослые', 'дети'];
const inputFormatForGuestsDropdown = { mergeItems: ['гость', 'гостя', 'гостей'], 'младенцы': ['младенец', 'младенца', 'младенцев'] };


new Dropdown('.choose__dropdown-guests-container', {
	mergeItems: mergeItemsForGuestsDropdown,
	inputFormat: inputFormatForGuestsDropdown,
	ItemsRequired: ['взрослые'],
	ItemsRequiredMessage: 'Без взрослых не заселяем.',
	footerButtonActived: true,
});
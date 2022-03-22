import './form-elements.scss'
import '../../ui-kit/_theme/ui-kit_theme_custom.scss'
import '../input/input'
import '../list/list'
import '../pagination/pagination'
import '../slider/slider'
import '../room-info/room-info'
import '../review/review'
import '../external-container/external-container'

import { Dropdown } from '../input/_dropdown/dropdown'
import { initDropdownFilterDate } from '../input/_dropdown/_filter-date/dropdown_filter-date'
import { initRoomInfo } from '../room-info/room-info'



const inputFormatForComfortDropdown = { 'спальни': ['спальня', 'спальни', 'спален'], 'кровати': ['кровать', 'кровати', 'кроватей'], 'ванные комнаты': ['ванная комната', 'ванных комнаты', 'ванных комнат'] };
const mergeItemsForGuestsDropdown = ['взрослые', 'дети'];
const inputFormatForGuestsDropdown = { mergeItems: ['гость', 'гостя', 'гостей'], 'младенцы': ['младенец', 'младенца', 'младенцев'] };


// new AirDatepickerCustom('.dropdown__input_date[data-type= "arrival"]', '.dropdown__input_date[data-type= "departure"]');
initDropdownFilterDate('.dropdown__input_filter-date');
new Dropdown('.form__container_dropdown-guests_closed', {
	mergeItems: mergeItemsForGuestsDropdown,
	inputFormat: inputFormatForGuestsDropdown,
	ItemsRequired: ['взрослые'],
	ItemsRequiredMessage: 'Без взрослых не заселяем.',
	footerButtonActived: true,
});

new Dropdown('.form__container_dropdown-comfort_closed', {
	inputFormat: inputFormatForComfortDropdown,
	selectedItems: { 'спальни': 2, 'кровати': 2, 'ванные комнаты': 0 },
});

new Dropdown('.form__container_dropdown-comfort_opened', {
	inputFormat: inputFormatForComfortDropdown,
	visible: true,
	selectedItems: { 'спальни': 2, 'кровати': 2, 'ванные комнаты': 0 },
});

new Dropdown('.form__container_dropdown-guests-empty_opened', {
	visible: true,
	mergeItems: mergeItemsForGuestsDropdown,
	inputFormat: inputFormatForGuestsDropdown,
	ItemsRequired: ['взрослые'],
	ItemsRequiredMessage: 'Без взрослых не заселяем.',
	footerButtonActived: true,
});

new Dropdown('.form__container_dropdown-guests_opened', {
	visible: true,
	mergeItems: mergeItemsForGuestsDropdown,
	inputFormat: inputFormatForGuestsDropdown,
	selectedItems: { 'взрослые': 2, 'дети': 1, 'младенцы': 0 },
	ItemsRequired: ['взрослые'],
	ItemsRequiredMessage: 'Без взрослых не заселяем.',
	footerButtonActived: true,
});

initRoomInfo(1);






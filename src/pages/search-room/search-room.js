import './search-room.scss'
import '../../ui-kit/_theme/ui-kit_theme_custom.scss'
import '../../ui-kit/header/header'
import '../../ui-kit/footer/footer'
import '../../ui-kit/input/input'
import '../../ui-kit/list/list'
// import '../../ui-kit/pagination/pagination'
import '../../ui-kit/slider/slider'
import '../../ui-kit/room-info/room-info'
// import '../../ui-kit/review/review'
import '../../ui-kit/external-container/external-container'
import { initHeader } from '../../ui-kit/header/header'
import { initDropdownFilterDate } from '../../ui-kit/input/_dropdown/_filter-date/dropdown_filter-date'
import { Dropdown } from '../../ui-kit/input/_dropdown/dropdown'

const inputFormatForComfortDropdown = { 'спальни': ['спальня', 'спальни', 'спален'], 'кровати': ['кровать', 'кровати', 'кроватей'], 'ванные комнаты': ['ванная комната', 'ванных комнаты', 'ванных комнат'] };
const mergeItemsForGuestsDropdown = ['взрослые', 'дети'];
const inputFormatForGuestsDropdown = { mergeItems: ['гость', 'гостя', 'гостей'], 'младенцы': ['младенец', 'младенца', 'младенцев'] };


initHeader(false, '.header__container')

initDropdownFilterDate('.dropdown__input_filter-date', );

new Dropdown('.dropdown__container_guests', {
	mergeItems: mergeItemsForGuestsDropdown,
	inputFormat: inputFormatForGuestsDropdown,
	selectedItems: { 'взрослые': 2, 'дети': 1, 'младенцы': 1 },
	ItemsRequired: ['взрослые'],
	ItemsRequiredMessage: 'Без взрослых не заселяем.',
	footerButtonActived: true,
});

new Dropdown('.dropdown__container_comfort', {
	inputFormat: inputFormatForComfortDropdown,
	selectedItems: { 'спальни': 2, 'кровати': 2, 'ванные комнаты': 0 },
});
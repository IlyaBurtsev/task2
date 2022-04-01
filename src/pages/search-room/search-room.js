import './search-room.scss'
import '../../ui-kit/_theme/ui-kit_theme_custom.scss'
import '../../ui-kit/header/header'
import '../../ui-kit/footer/footer'
import '../../ui-kit/input/input'
import '../../ui-kit/list/list'
import '../../ui-kit/pagination/pagination'
import '../../ui-kit/slider/slider'
import '../../ui-kit/room-info/room-info'
// import '../../ui-kit/review/review'
import '../../ui-kit/external-container/external-container'
import '../../ui-kit/room-preview/room-preview'
import { initHeader } from '../../ui-kit/header/header'
import { initDropdownFilterDate } from '../../ui-kit/input/_dropdown/_filter-date/dropdown_filter-date'
import { Dropdown } from '../../ui-kit/input/_dropdown/dropdown'
import { initRoomPreview } from '../../ui-kit/room-preview/room-preview'
import { getRoomRepository } from '../../repository/roomRepository/RoomRepository'
import { getElement, getElements } from '../../utils/utils'


initSearchRoom();
function initSearchRoom(page) {

	const inputFormatForComfortDropdown = { 'спальни': ['спальня', 'спальни', 'спален'], 'кровати': ['кровать', 'кровати', 'кроватей'], 'ванные комнаты': ['ванная комната', 'ванных комнаты', 'ванных комнат'] };
	const mergeItemsForGuestsDropdown = ['взрослые', 'дети'];
	const inputFormatForGuestsDropdown = { mergeItems: ['гость', 'гостя', 'гостей'], 'младенцы': ['младенец', 'младенца', 'младенцев'] };

	const currentPage = page ? page : 1;


	initHeader(false, '.header__container')

	initDropdownFilterDate('.dropdown__input_filter-date',);

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
	initFilteredRooms(getRoomRepository().getRooms((currentPage*12 - 11), (currentPage*12)))
	function initFilteredRooms(rooms) {
		const firstRoom = rooms.shift();
		const $roomTamplate = getElement('.room-preview__container');
		

		rooms.forEach(room => {
			let $newRoom = $roomTamplate.cloneNode(true);
			preparateRoom(room, $newRoom);
			initRoomPreview(room, $newRoom);
			$roomTamplate.parentNode.append($newRoom);
		})
		preparateRoom(firstRoom, $roomTamplate);
		initRoomPreview(firstRoom, $roomTamplate);
	}

	function preparateRoom(room, $element) {
		const roomNumber = room.getRoomNumber();
		$element.setAttribute("room-number", roomNumber);

		getElements('.switch__input_radio_white', $element).forEach($button => $button.setAttribute('name', `slider-${roomNumber}`)); 
		getElements('.button__input_rate', $element).forEach($button => $button.setAttribute('name', roomNumber));
	}
	
}
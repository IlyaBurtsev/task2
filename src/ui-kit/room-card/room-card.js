import './room-card.scss'
import '../blocks/dropdown-date-block/dropdown-date-block'
import { Dropdown } from '../input/_dropdown/dropdown';
import { initDateBlock } from '../blocks/dropdown-date-block/dropdown-date-block';



// var a = Date.parse(start);
// var b = Date.parse(end);
//var days = Math.floor(Math.abs(b-a)/(1000*60*60*24)) ;

export function initRoomCards(room) {
	const $titleContainer = document.querySelector('.room-card__title-container ');

	let formatter = new Intl.NumberFormat('Ru')

	const roomNumber = '<span class="number">№</span> ' + room.getRoomNumber() + (room.isLuxury ? ' <span class="additional">Люкс</span>' : '');
	$titleContainer.firstElementChild.innerHTML = roomNumber;
	$titleContainer.lastElementChild.innerHTML = `<span>${formatter.format(room.getRoomPrice())}₽</span> в сутки`;

	initDateBlock('room', ['2019-08-19', '2019-08-23'])


	const mergeItemsForGuestsDropdown = ['взрослые', 'дети'];
	const inputFormatForGuestsDropdown = { mergeItems: ['гость', 'гостя', 'гостей'], 'младенцы': ['младенец', 'младенца', 'младенцев'] };

	new Dropdown('.room-card__dropdown', {
		mergeItems: mergeItemsForGuestsDropdown,
		inputFormat: inputFormatForGuestsDropdown,
		selectedItems: { 'взрослые': 2, 'дети': 1, 'младенцы': 0 },
		ItemsRequired: ['взрослые'],
		ItemsRequiredMessage: 'Без взрослых не заселяем.',
		footerButtonActived: true,
	});


}
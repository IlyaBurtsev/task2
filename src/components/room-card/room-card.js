import './room-card.scss'
import '../blocks/dropdown-date-block/dropdown-date-block'
import { Dropdown } from '../input/_dropdown/dropdown';
import { initDateBlock } from '../blocks/dropdown-date-block/dropdown-date-block';
import { getServiceRepository } from '../../repository/serviceRepository/serviceRepository'
import { getElement } from '../../utils/utils';


export function initRoomCards(room) {
	const $roomCard = getElement('.room-card__container');
	const $roomInfo = getElement('.room-card__room-info');
	const $roomPrice = getElement('.room-card__room-price ');
	const $roomNumber = getElement('.room-card__room-number', $roomCard);

	const toxinService = getServiceRepository().getServiceInfo();

	const serviceFee = toxinService.getServiceFee();
	const discount = toxinService.getDiscount() ? toxinService.getDiscount() : 0;
	const addServiceFee = toxinService.getAdditionalServiceFee();


	const formatter = new Intl.NumberFormat('Ru')

	let price = room.getRoomPrice();
	
	const roomNumberToString = '<span class="room-card__number">№</span> ' + room.getRoomNumber() + (room.isLuxury ? ' <span class="room-card__additional">Люкс</span>' : '');

	$roomNumber.innerHTML = roomNumberToString;
	$roomNumber.nextElementSibling.innerHTML = `<span>${formatter.format(price)}₽</span> в сутки`;


	initDateBlock('room', ['2019-08-19', '2019-08-23'], setPriceInfo);


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

	function setPriceInfo(selectedDates) {

		let days = 1;
		days = getDays(selectedDates);

		$roomInfo.innerHTML = `${formatter.format(price)}₽ x ${days} суток`;
		$roomPrice.innerHTML = `${formatter.format(price * days)}₽`;

		if (discount != 0) {
			$roomInfo.nextElementSibling.innerHTML = `Сбор за услуги: скидка ${formatter.format(discount)}₽`;
		}

		$roomPrice.nextElementSibling.innerHTML = `${formatter.format(serviceFee)}₽`;

		$roomPrice.nextElementSibling.nextElementSibling.innerHTML = `${formatter.format(addServiceFee)}₽`;

		$roomPrice.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = `${formatter.format(price * days + serviceFee + addServiceFee - discount)}₽`;

	}

	function getDays(selectedDates = []) {
		if (selectedDates.length === 2) {
			let start = Date.parse(selectedDates[0]);
			let end = Date.parse(selectedDates[1]);
			return Math.floor(Math.abs(end - start) / (1000 * 60 * 60 * 24));
		}
	}
}
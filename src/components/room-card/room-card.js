import './room-card.scss'
import '../dropdown/dropdown'
import '../title/title'
import '../button/button'

import { getElement } from '../../utils/utils';
import { initDropdown } from '../dropdown/dropdown'


export function initRoomCards(room, serviceInfo) {
	const roomCard = getElement('.room-card__container');
	const roomInfo = getElement('.room-card__room-info');
	const roomPrice = getElement('.room-card__room-price ');
	const roomNumber = getElement('.room-card__room-number', roomCard);

	const serviceFee = serviceInfo.getServiceFee();
	const discount = serviceInfo.getDiscount() ? serviceInfo.getDiscount() : 0;
	const addServiceFee = serviceInfo.getAdditionalServiceFee();


	const formatter = new Intl.NumberFormat('Ru')

	let price = room.getRoomPrice();
	
	const roomNumberToString = '<span class="room-card__number">№</span> ' + room.getRoomNumber() + (room.isLuxury ? ' <span class="room-card__additional">Люкс</span>' : '');

	roomNumber.innerHTML = roomNumberToString;
	roomNumber.nextElementSibling.innerHTML = `<span>${formatter.format(price)}₽</span> в сутки`;


	initDropdown(getElement('.room-card__date-dropdown'), setPriceInfo);
	initDropdown(getElement('.room-card__items-dropdown'));


	function setPriceInfo(selectedDates) {

		let days = 1;
		days = getDays(selectedDates);

		roomInfo.innerHTML = `${formatter.format(price)}₽ x ${days} суток`;
		roomPrice.innerHTML = `${formatter.format(price * days)}₽`;

		if (discount != 0) {
			roomInfo.nextElementSibling.innerHTML = `Сбор за услуги: скидка ${formatter.format(discount)}₽`;
		}

		roomPrice.nextElementSibling.innerHTML = `${formatter.format(serviceFee)}₽`;

		roomPrice.nextElementSibling.nextElementSibling.innerHTML = `${formatter.format(addServiceFee)}₽`;

		roomPrice.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = `${formatter.format(price * days + serviceFee + addServiceFee - discount)}₽`;

	}

	function getDays(selectedDates = []) {
		if (selectedDates.length === 2) {
			let start = Date.parse(selectedDates[0]);
			let end = Date.parse(selectedDates[1]);
			return Math.floor(Math.abs(end - start) / (1000 * 60 * 60 * 24));
		}
	}
}
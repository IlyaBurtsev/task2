import './room-preview.scss'
import '../blocks/slider-button-block/slider-button-block'

import { createElement, getElement } from '../../utils/utils';

export function initRoomPreview(room){
	const $roomPreview = getElement(`.room-preview__container[room-number="${room.getRoomNumber()}"]`)
	const $ratingCounter = getElement('.room-preview__rating-counter', $roomPreview);
	const $roomNumber = getElement('.room-preview__room-number', $roomPreview);
	const $rating = getElement(`.button__input_rate[rating="${room.getRoomRating()}"]`, $roomPreview);
	const imgContainer = getElement('.room-preview__img-container')
	const pictures = room.getRoomPictures();

	pictures.forEach(picture => {
		let $img = createElement({tagName: 'img', className: 'room-preview__image', attrs: {alt: 'room image'}});
		$img.src = picture;
		imgContainer.append($img);
	})

	
	$rating.setAttribute('checked', '');
	const formatter = new Intl.NumberFormat('Ru');

	const roomNumberToString = '<span class="room-preview__number">№</span> ' + room.getRoomNumber() + (room.isLuxury ? '<span class="room-preview__additional">Люкс</span>' : '');

	$roomNumber.innerHTML = roomNumberToString;
	$roomNumber.nextElementSibling.innerHTML = `<span>${formatter.format(room.getRoomPrice())}₽</span> в сутки`;

	$ratingCounter.innerHTML = `<span>${room.getRoomRatingCounter()}</span> Отзывов`


}
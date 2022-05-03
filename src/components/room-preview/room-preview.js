import './room-preview.scss'
import '../blocks/slider-button-block/slider-button-block'

import { createElement, getElement } from '../../utils/utils';

export function initRoomPreview(room, $roomPreview) {
	if(!$roomPreview){
		$roomPreview = getElement(`.room-preview__container[room-number="${room.getRoomNumber()}"]`)
	}
	const $ratingCounter = getElement('.room-preview__rating-counter', $roomPreview);
	const $roomNumber = getElement('.room-preview__room-number', $roomPreview);
	const $rating = getElement(`.button__input_rate[rating="${room.getRoomRating()}"]`, $roomPreview);
	const $imgContainer = getElement('.room-preview__img-container', $roomPreview);

	const $prevButton = getElement('.room-preview__prev-button', $roomPreview);
	const $nextButton = getElement('.room-preview__next-button', $roomPreview);
	
	const pictures = room.getRoomPictures();

	if(room){
		$roomPreview.classList.add('room-preview__container_not-empty')
	}
	if(pictures.length > 1){
		$imgContainer.parentNode.classList.add('room-preview__view-port_button_show');
		
	}

	let currentPicturePosition = 0;
	
	pictures.forEach(picture => {
		let $img = createElement({ tagName: 'img', className: 'room-preview__image', attrs: { alt: 'room image' } });
		$img.src = picture;
		$imgContainer.append($img);
	})

	const $navButtonsContainer = getElement('.room-preview__button-container', $roomPreview);

	$navButtonsContainer.addEventListener('click', showPicture);
	$nextButton.addEventListener('click', showNextPicture);
	$prevButton.addEventListener('click', showPrevPicture);



	$rating.setAttribute('checked', '');
	const formatter = new Intl.NumberFormat('Ru');

	const roomNumberToString = '<span class="room-preview__number">№</span> ' + room.getRoomNumber() + (room.isLuxury ? '<span class="room-preview__additional">Люкс</span>' : '');

	$roomNumber.innerHTML = roomNumberToString;
	$roomNumber.nextElementSibling.innerHTML = `<span>${formatter.format(room.getRoomPrice())}₽</span> в сутки`;

	$ratingCounter.innerHTML = `<span>${room.getRoomRatingCounter()}</span> Отзывов`

	function showPicture(e) {
		if (e.target.classList.contains('switch__input_radio_white')) {
			let position = e.target.getAttribute('data-selected');
			if (position > pictures.length - 1) {
				position = pictures.length - 1;
			}	
			currentPicturePosition = position;	
			$imgContainer.style.transform = `translate(${-27*position}rem, 0)`;	
		}
		
	}

	function showNextPicture(){
		if(currentPicturePosition < pictures.length -1){
			getElement(`.switch__input_radio_white[data-selected="${currentPicturePosition}"]`).removeAttribute('checked');
			$imgContainer.style.transform = `translate(${-27*(++currentPicturePosition)}rem, 0)`;	
			getElement(`.switch__input_radio_white[data-selected="${currentPicturePosition}"]`).setAttribute('checked', '');
			
		}
	}
	function showPrevPicture(){
		if(currentPicturePosition > 0){
			getElement(`.switch__input_radio_white[data-selected="${currentPicturePosition}"]`).removeAttribute('checked');
			$imgContainer.style.transform = `translate(${-27*(--currentPicturePosition)}rem, 0)`;
			getElement(`.switch__input_radio_white[data-selected="${currentPicturePosition}"]`).setAttribute('checked', '');
			
		}
	}

	return $roomPreview
}



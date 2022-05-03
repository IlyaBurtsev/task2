import './room-preview.scss'
import '../rating/rating'


import { createElement, getElement } from '../../utils/utils';

export function initRoomPreview(room, roomPreview) {

	const ratingCounter = getElement('.room-preview__rating-counter', roomPreview);
	const roomNumber = getElement('.room-preview__room-number', roomPreview);
	const rating = getElement(`.button__input_rate[rating="${room.getRoomRating()}"]`, roomPreview);
	const imgContainer = getElement('.room-preview__img-container', roomPreview);

	const prevButton = getElement('.room-preview__prev-button', roomPreview);
	const nextButton = getElement('.room-preview__next-button', roomPreview);
	const navButtonsContainer = getElement('.room-preview__button-container', roomPreview);
	
	const pictures = room.getRoomPictures();

	if(room){
		roomPreview.classList.add('room-preview__container_not-empty')
	}
	if(pictures.length > 1){
		imgContainer.parentNode.classList.add('room-preview__view-port_button_show');	
	}

	let currentPicturePosition = 0;
	const imgFragment = document.createDocumentFragment();
	const buttonsFragment = document.createDocumentFragment();
	pictures.forEach((picture, i) => {
		let img = createElement({ tagName: 'img', className: 'room-preview__image', attrs: { alt: 'room image' } });
		let button = createElement({tagName: 'div', className: 'room-preview__slider-button room-preview__slider-button_selected', attrs: {position: i}});
		img.src = picture;
		imgFragment.append(img);
		buttonsFragment.append(button);
	})
	imgContainer.append(imgFragment);
	navButtonsContainer.append(buttonsFragment);

	navButtonsContainer.addEventListener('click', showPicture);
	nextButton.addEventListener('click', showNextPicture);
	prevButton.addEventListener('click', showPrevPicture);



	rating.setAttribute('checked', '');
	const formatter = new Intl.NumberFormat('Ru');

	const roomNumberToString = '<span class="room-preview__number">№</span> ' + room.getRoomNumber() + (room.isLuxury ? '<span class="room-preview__additional">Люкс</span>' : '');

	roomNumber.innerHTML = roomNumberToString;
	roomNumber.nextElementSibling.innerHTML = `<span>${formatter.format(room.getRoomPrice())}₽</span> в сутки`;

	ratingCounter.innerHTML = `<span>${room.getRoomRatingCounter()}</span> Отзывов`

	function showPicture(e) {
		if (e.target.classList.contains('room-preview__slider-button')) {
			let position = e.target.getAttribute('position');
			if (position > pictures.length - 1) {
				position = pictures.length - 1;
			}	
			currentPicturePosition = position;	
			imgContainer.style.transform = `translate(${-27*position}rem, 0)`;	
		}
		
	}

	function showNextPicture(){
		if(currentPicturePosition < pictures.length -1){
			imgContainer.style.transform = `translate(${-27*(++currentPicturePosition)}rem, 0)`;	
		}
	}
	function showPrevPicture(){
		if(currentPicturePosition > 0){
			// getElement(`.switch__input_radio_white[data-selected="${currentPicturePosition}"]`).removeAttribute('checked');
			imgContainer.style.transform = `translate(${-27*(--currentPicturePosition)}rem, 0)`;
			// getElement(`.switch__input_radio_white[data-selected="${currentPicturePosition}"]`).setAttribute('checked', '');
			
		}
	}

	return roomPreview
}



import './room-preview.scss';
import '../rating/rating';

import { addClass, createElement, getElement, getElements, removeClass } from '../../utils/utils';
import { RoomPreview } from './classes/RoomPreview';

const bindRoomPreview = (preview) => {
  removeClass(preview, 'room-preview__container_empty');
};

const getSlider = (container) => {
	return getElement('.js-room-preview__slider', container);
}

const setSliderHovered = (slider) => {
	addClass(slider, 'room-preview__slider_hover')
}

const removeSliderHovered = (slider) => {
	removeClass(slider, 'room-preview__slider_hover')
}
const getImageContainer = (container) => {
  return getElement('.js-room-preview__img-container', container);
};

const getNavButtonsContainer = (container) => {
  return getElement('.js-room-preview__button-container', container);
};

const createImg = (path) => {
  return createElement({
    tagName: 'img',
    className: 'room-preview__image',
    attrs: { src: path, alt: 'room image' },
  });
	
};

const createSliderNavButton = (position) => {
  return createElement({
    tagName: 'div',
    className: 'room-preview__slider-button',
    attrs: { position: position },
  });
};

const setTitlePreview = (preview, titlePreviewData) => {
  const { roomNumber, isLuxury, roomPrice } = titlePreviewData;
  const roomNumberElement = getElement('.js-room-preview__room-number', preview);
  const formatter = new Intl.NumberFormat('Ru');

  const roomNumberToString =
    '<span class="room-preview__number">№</span> ' +
    roomNumber +
    (isLuxury ? '<span class="room-preview__additional">Люкс</span>' : '');

  roomNumberElement.innerHTML = roomNumberToString;
  roomNumberElement.nextElementSibling.innerHTML = `<span>${formatter.format(
    roomPrice
  )}₽</span> в сутки`;
};

const setRating = (preview, ratingValue, ratingCount) => {
  const rating = getElement(
    `.button__input_rate[rating="${ratingValue}"]`,
    preview
  );
  rating.setAttribute('checked', '');

  const ratingCounter = getElement(
    '.room-preview__rating-counter',
    preview
  );
  ratingCounter.innerHTML = `<span>${ratingCount}</span> Отзывов`;
};

const sliderNextButtonPressed = (element) => {
  if (element.classList.contains('room-preview__next-button')) {
    return true;
  }
};

const sliderPreviousButtonPressed = (element) => {
  if (element.classList.contains('room-preview__prev-button')) {
    return true;
  }
};

const sliderNavButtonPressed = (element) => {
  if (element.classList.contains('room-preview__slider-button')) {
    return element.getAttribute('position');
  }else {
		return false;
	}
};

const setNavButtonSelected = (button) => {
	addClass(button, 'room-preview__slider-button_selected');
}

const removeNavButtonSelected = (button) => {
	removeClass(button, 'room-preview__slider-button_selected')
}


const initRoomPreview = (previewsData, elementContainer) => {
	const bindElement = getElement('.js-room-preview__container', elementContainer);
	if (!previewsData) {
		return;
	}
	const firstPreviewData = previewsData.shift();
	
	const previewsFragment = document.createDocumentFragment();
	previewsData.forEach(previewData => {
		const newPreview = bindElement.cloneNode(true);
		new RoomPreview(newPreview, previewData);
		previewsFragment.append(newPreview);
	})

	new RoomPreview(bindElement, firstPreviewData);
	
	bindElement.after(previewsFragment); 
}

export {
  bindRoomPreview,
	getSlider,
	setSliderHovered,
	removeSliderHovered,
  getImageContainer,
  getNavButtonsContainer,
  createImg,
  createSliderNavButton,
  setTitlePreview,
  setRating,
	sliderNextButtonPressed,
	sliderPreviousButtonPressed,
	sliderNavButtonPressed,
	setNavButtonSelected,
	removeNavButtonSelected,
	initRoomPreview
};

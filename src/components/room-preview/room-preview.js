import './room-preview.scss';
import '../rating/rating';

import { addClass, createElement, getElement, getElements, removeClass } from '../../utils/utils';
import { RoomPreview } from './classes/RoomPreview';
import { setRatingGroupName, setRatingValue } from '../rating/rating';

const bindRoomPreview = (preview) => {
  removeClass(preview, 'room-preview__container_empty');
};

const getSlider = (container) => {
	return getElement('.js-room-preview__slider', container);
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



const setRatingInfo = (ratingCount, bindElement) => {
	const ratingCounter = getElement(
    '.room-preview__rating-counter',
    bindElement
  );
  ratingCounter.innerHTML = `<span>${ratingCount}</span> Отзывов`;
}

const initRatingBlock = (options) => {
	const {ratingValue, ratingCount, groupName, bindElement} = options

	setRatingGroupName(groupName, bindElement);
	setRatingValue(ratingValue, bindElement);
	setRatingInfo(ratingCount, bindElement);
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


const initRoomPreviews = (previewsData, elementContainer) => {
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
  getImageContainer,
  getNavButtonsContainer,
  createImg,
  createSliderNavButton,
  setTitlePreview,
  initRatingBlock,
	sliderNextButtonPressed,
	sliderPreviousButtonPressed,
	sliderNavButtonPressed,
	setNavButtonSelected,
	removeNavButtonSelected,
	initRoomPreviews
};

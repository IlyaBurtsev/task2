import './room-preview.scss';
import '../rating/rating';

import {
  addClass,
  createElement,
  getElement,
  removeClass,
} from '../../utils/utils';
import { setRatingGroupName, setRatingValue } from '../rating/rating';

import RoomPreview from './classes/RoomPreview';

const initPreview = (bindElement) => {
  const className = {
    container: 'js-room-preview__container',
    emtyContainer: 'room-preview__container_empty',
    image: 'room-preview__image',
    sliderNavButton: 'room-preview__slider-button',
  };
  let preview = '';
  if (bindElement) {
    if (bindElement.classList.contains(className.container)) {
      preview = bindElement;
    } else {
      preview = getElement(`.${className.container}`, bindElement);
    }
  } else {
    preview = getElement(`.${className.container}`, bindElement);
  }
  const slider = preview.firstElementChild;
  const imageContainer = slider.firstElementChild.firstElementChild;
  const navButtonsContainer = slider.firstElementChild.lastElementChild;

  const removeEmptyContainer = () => {
    removeClass(preview, className.emtyContainer);
  };
  const createImg = (path) => {
    return createElement({
      tagName: 'img',
      className: className.image,
      attrs: { src: path, alt: 'room image' },
    });
  };
  const createSliderNavButton = (position) => {
    return createElement({
      tagName: 'div',
      className: className.sliderNavButton,
      attrs: { position: position },
    });
  };
  const setTitlePreview = (titlePreviewData) => {
    const { roomNumber, isLuxury, roomPrice } = titlePreviewData;
    const roomNumberElement = slider.nextElementSibling.firstElementChild;
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
  const setRatingInfo = (ratingCount) => {
    const ratingCounter = preview.lastElementChild.lastElementChild;
    ratingCounter.innerHTML = `<span>${ratingCount}</span> Отзывов`;
  };
  const initRatingBlock = (options) => {
    const { ratingValue, ratingCount, groupName } = options;

    setRatingGroupName(groupName, preview.lastElementChild);
    setRatingValue(ratingValue, preview.lastElementChild);
    setRatingInfo(ratingCount, preview.lastElementChild);
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
    } else {
      return false;
    }
  };

  const setNavButtonSelected = (button) => {
    addClass(button, 'room-preview__slider-button_selected');
  };

  const removeNavButtonSelected = (button) => {
    removeClass(button, 'room-preview__slider-button_selected');
  };
  return {
    preview,
    slider,
    imageContainer,
    navButtonsContainer,
    removeEmptyContainer,
    createImg,
    createSliderNavButton,
    setTitlePreview,
    initRatingBlock,
    sliderNextButtonPressed,
    sliderPreviousButtonPressed,
    sliderNavButtonPressed,
    setNavButtonSelected,
    removeNavButtonSelected,
  };
};

const initRoomPreviews = (previewsData, bindElement) => {
  if (!previewsData) {
    return;
  }
  const componentPreview = initPreview(bindElement);
  const { preview } = componentPreview;
  const firstPreviewData = previewsData.shift();
  const previewsFragment = document.createDocumentFragment();
  previewsData.forEach((previewData) => {
    const newPreview = preview.cloneNode(true);
    new RoomPreview(initPreview(newPreview), previewData);
    previewsFragment.append(newPreview);
  });
  new RoomPreview(componentPreview, firstPreviewData);

  preview.after(previewsFragment);
};

export default initRoomPreviews;

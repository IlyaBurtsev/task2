import './button.scss';
import './_white-text/button_white-text.scss';
import './_purple-text/button_purple-text.scss';
import './_pay/button_pay.scss';
import './_link/button_link.scss';
import './_like/button_like.scss';
import { addClass, getElement, removeClass } from '../../utils/utils';

const initButton = (bindElement) => {
  const className = {
    container: 'js-button__container',
    buttonSelected: 'button__container_like_selected',
  };
	let button
	if (bindElement.classList.contains(className.container)){
		button = bindElement
	} else {
		button = getElement(`.${className.container}`, bindElement);
	}
  return {
    button,
    setValue: (likeCounter) => {
      button.firstElementChild.value = likeCounter;
    },
    setSelected: () => {
      addClass(button, className.buttonSelected);
    },
    removeSelected: () => {
      removeClass(button, className.buttonSelected);
    },
    isSelected: () => {
      return button.classList.contains(className.buttonSelected);
    },
    incrementValue: () => {
      button.firstElementChild.value++;
    },
    decrementValue: () => {
      button.firstElementChild.value--;
    },
  };
};

export default initButton;

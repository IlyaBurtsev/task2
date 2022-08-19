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
  const button = getElement(`.${className.container}`, bindElement);
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
  };
};

export default initButton;

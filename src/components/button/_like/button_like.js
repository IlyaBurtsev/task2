import { closest, addClass, removeClass, getElement } from '../../../utils/utils';
import './button_like.scss';

export const initLikeButton = (bindElement, userId) =>{
	const button = getElement('.js-button__input_like', bindElement);
	button.setAttribute('user-id', userId);
	return button;
}

export const likeButtonPressed = (e, setLikePressedTriger) => {
	if (e.target.classList.contains('button__input_like')) {
		
		let container = closest(e.target, '.js-button__container_like');
  	let isLiked = container.classList.contains('button__container_like_selected');

  	if (!isLiked) {
    	e.target.value++;
    	addClass(container, 'button__container_like_selected');
  	} else {
    	e.target.value--;
   	 removeClass(container, 'button__container_like_selected');
  	}
		setLikePressedTriger(e.target.value, e.target.getAttribute('user-id'));
	} 
}

//-TODO только для проверки, потом убрать.
// $('.js-button__container_like').on('click', likeButtonPressed);

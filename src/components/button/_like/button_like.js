import './button_like.scss';
import { closest, addClass, removeClass, getElement, getElements } from '../../../utils/utils';


export const initLikeButton = (bindElement, userId, value, liked) =>{
	const button = getElement('.js-button__input_like', bindElement);
	button.setAttribute('user-id', userId);
	button.value = value;
	if (liked) {
		addClass(	closest(button, '.js-button__container_like'), 'button__container_like_selected')
	}
	return button;
}

export const likeButtonPressed = (e, callbackFunc) => {
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
		if(typeof callbackFunc == 'function')
		callbackFunc(e.target.value, e.target.getAttribute('user-id'));
	} 
}

export const likeButtonDemo = () => {
	getElements('.js-button__input_like').forEach(button =>	button.addEventListener('click', likeButtonPressed));
}


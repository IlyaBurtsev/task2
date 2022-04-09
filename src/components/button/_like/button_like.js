import { closest, addClass, removeClass } from '../../../utils/utils';
import './button_like.scss';

//-TODO только для проверки, потом убрать.
$('.js-button__container_like').on('click', (e) => likeButtonPressed(e));

export function likeButtonPressed(e) {
  let container = closest(e.target, '.js-button__container_like');
  let isLiked = container.classList.contains('button__container_like_selected');

  if (!isLiked) {
    e.target.value++;
    addClass(container, 'button__container_like_selected');
  } else {
    e.target.value--;
    removeClass(container, 'button__container_like_selected');
  }
}

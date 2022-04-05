import { 
	getElements,
	collectionToArray,
	closest, 
} from '../../../../utils/utils'
import './button_like.scss'


const likeButton = '.button__input_like'
const liked = 'button__input_like_selected'

$(function () {


	initButtonState();

	$(likeButton).on('click', function (event) {

		let isLiked = $(event.target).data('selected');
		let counter = Number($(event.target).val());

		$(event.target.closest('.button__container_like')).toggleClass(liked);
		if (!isLiked) {
			$(event.target).val(counter + 1);
			$(event.target).data('selected', true);
		} else {
			$(event.target).val(counter - 1);
			$(event.target).data('selected', false);
		}
	})
})

function initButtonState() {
	const likeButtons = collectionToArray(getElements(likeButton));
	likeButtons.forEach(button => {
		if(button.getAttribute('data-selected') === 'true'){
			closest(button, '.button__container_like').classList.add(liked);
		}
	})
}




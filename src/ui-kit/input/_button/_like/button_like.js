
import './button_like.scss'

$(function () {
	const likeButton = '.button__input_like'
	const liked = 'button__input_like_selected'

	if($(likeButton).data('selected') === true){
		let container = $(likeButton).closest('.button__container_like');
		$(container).toggleClass(liked);
	}
	
	$(likeButton).on('click', function (event) {
		
		let isLiked=$(event.target).data('selected');
		let counter=Number($(event.target).val());

		$(event.target.closest('.button__container_like')).toggleClass(liked);	
		if (!isLiked) {
			$(event.target).val(counter+1);
			$(event.target).data('selected', true);
		} else {
			$(event.target).val(counter-1);
			$(event.target).data('selected', false);	
		}
	})
})




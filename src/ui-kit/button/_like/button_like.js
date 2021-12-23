
import './button_like.scss'

$(function () {
	let likeButton = '.button__input_like'
	let liked = 'button__input_like_liked'

	$(likeButton).on('click', function (event) {
		
		let isLiked=$(event.target).data('liked')
		let counter=Number($(event.target).val())

		$(event.target).toggleClass(liked);	
		if (!isLiked) {
			$(event.target).val(counter+1)
			$(event.target).data('liked', true)
		} else {
			$(event.target).val(counter-1)
			$(event.target).data('liked', false)	
		}
	})
})




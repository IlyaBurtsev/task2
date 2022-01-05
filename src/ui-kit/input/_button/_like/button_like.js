
import './button_like.scss'

$(function () {
	let likeButton = '.button__input_like'
	let liked = 'button__input_like_selected'
	
	$(likeButton).on('click', function (event) {
		
		let isLiked=$(event.target).data('selected')
		console.log('in click:'+isLiked)
		let counter=Number($(event.target).val())

		$(event.target).toggleClass(liked);	
		if (!isLiked) {
			$(event.target).val(counter+1)
			$(event.target).data('selected', true)
		} else {
			$(event.target).val(counter-1)
			$(event.target).data('selected', false)	
		}
	})
})




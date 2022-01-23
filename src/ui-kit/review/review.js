import './review.scss'
import { getRoomRepository } from '../../repository/roomRepository/RoomRepositoryMock'
import { getElement } from '../../utils/utils'

createReviews('.rewiew__container');

function createReviews(bindElement) {
	let $review = getElement(bindElement);
	const reviews = getRoomRepository().getReviews();
	const firstReview = reviews.shift();
	console.log($review)
	
	
	
	reviews.forEach(review => {
		
		let $newReview = $review.cloneNode(true);
		
		setReviewData($newReview, review);
		$review.after($newReview);
	})
	setReviewData($review, firstReview);




	function setReviewData($reviewItem, reviewItem) {
		getElement('.review__image', $reviewItem).src = reviewItem.avatarPath;
		const $user = getElement('.review__user-name', $reviewItem);

		$user.innerHTML = reviewItem.userName;
		$user.nextElementSibling.innerHTML = reviewItem.dateCreated;

		const $likeButton = getElement('.button__input_like', $reviewItem);

		$likeButton.value = reviewItem.likeCounter;

		if (reviewItem.likedByUsers.includes('Иван Петров')) {

			$likeButton.setAttribute('data-selected', "true");
		}else{
			$likeButton.setAttribute('data-selected', "false");
		}
		getElement('.review__content', $reviewItem).innerHTML = reviewItem.reviewContent;
	}

}
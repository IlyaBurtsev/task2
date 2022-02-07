import './review.scss'
import { getRoomRepository } from '../../repository/roomRepository/RoomRepository';
import { getUserRepository } from '../../repository/userRepository/UserRepository';
import { getElement } from '../../utils/utils'

createReviews('.rewiew__container');

function createReviews(bindElement, roomNamber) {
	let $review = getElement(bindElement);
	const reviews = getRoomRepository().getRoomByNumber(roomNamber).getReviews();
	
	const firstReview = reviews.shift();
	
	reviews.forEach(review => {
		
		let $newReview = $review.cloneNode(true);
		
		setReviewData($newReview, review);
		$review.parentNode.append($newReview);
	})
	setReviewData($review, firstReview);


	function setReviewData($reviewItem, reviewItem) {
		const creator = getUserRepository().getUserById(reviewItem.creator);

		getElement('.review__image', $reviewItem).src = creator.avatar;
		
		const $user = getElement('.review__user-name', $reviewItem);

		$user.innerHTML = creator.userToString();
		$user.nextElementSibling.innerHTML = reviewItem.dateCreated;

		const $likeButton = getElement('.button__input_like', $reviewItem);

		$likeButton.value = reviewItem.likeCounter;

		if (reviewItem.likedByUsers.includes(getUserRepository().getCurrentUser().getId())) {

			$likeButton.setAttribute('data-selected', true);
		}else{
			$likeButton.setAttribute('data-selected', false);
		}
		getElement('.review__content', $reviewItem).innerHTML = reviewItem.reviewContent;
	}

}
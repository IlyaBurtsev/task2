import './review.scss';
import { getElement } from '../../utils/utils';
import { initLikeButton } from '../button/_like/button_like';


export function initReviews(reviews, bindElement, userRepository) {
	const fragment = document.createDocumentFragment();
	const review = getElement('.rewiew__container', bindElement);
	const firstReviewData = reviews.shift();
	
	reviews.forEach(reviewData => {	
		let newReview = review.cloneNode(true);
		setReviewData(newReview, reviewData);
		fragment.append(newReview);
	})
	setReviewData(review, firstReviewData);
	review.append(fragment);


	function setReviewData(review, reviewData) {
		const creator = userRepository.getUserById(reviewData.creator);
		const userName = getElement('.review__user-name', review);

		let isLiked = false;

		getElement('.review__image', review).src = creator.avatar;
		
		userName.innerHTML = creator.userToString();
		userName.nextElementSibling.innerHTML = reviewData.dateCreated;

		if (reviewData.likedByUsers.includes(userRepository.getCurrentUser().getId())){
			isLiked=true;
		}
		initLikeButton(review, creator.getId(), reviewData.likeCounter, isLiked);

		getElement('.review__content', review).innerHTML = reviewData.reviewContent;
	}

}
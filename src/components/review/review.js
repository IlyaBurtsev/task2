import './review.scss';
import { getElement } from '../../utils/utils';
import initButton from '../button/button';

export function initReviews(reviews, userRepository, bindElement) {
  const fragment = document.createDocumentFragment();
  const review = getElement('.rewiew__container', bindElement);
  const firstReviewData = reviews.shift();

  reviews.forEach((reviewData) => {
    let newReview = review.cloneNode(true);
    setReviewData(newReview, reviewData);
    fragment.append(newReview);
  });
  setReviewData(review, firstReviewData);
  review.after(fragment);

  function setReviewData(review, reviewData) {
    const creator = userRepository.getUserById(reviewData.creator);
    const currentUser = userRepository.getCurrentUser();
    const userName = getElement('.review__user-name', review);
    const { likedByUsers, likeCounter, dateCreated } = reviewData;

    let isLiked = false;

    getElement('.review__image', review).src = creator.avatar;

    userName.innerHTML = creator.userToString();
    userName.nextElementSibling.innerHTML = dateCreated;

    if (likedByUsers.includes(currentUser.getId())) {
      isLiked = true;
    }
    const buttonComponent = initButton(review);
    const { button, setValue, setSelected, removeSelected } = buttonComponent;
    setValue(likeCounter);
    isLiked ? setSelected() : '';
    const onClickLikeButton = (e) => {
      if (isLiked) {
        reviewData.likeCounter -= 1;
        removeSelected();
        likedByUsers.filter((userId) => {
          userId !== currentUser.getId();
        });
        isLiked = false;
      } else {
        reviewData.likeCounter += 1;
        setSelected();
        likedByUsers.push(currentUser.getId());
        isLiked = true;
      }
      setValue(reviewData.likeCounter);
    };
    button.addEventListener('click', onClickLikeButton);

    getElement('.review__content', review).innerHTML = reviewData.reviewContent;
  }
}

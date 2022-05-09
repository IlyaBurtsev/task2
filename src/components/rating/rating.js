import { getElement, getElements } from '../../utils/utils'
import './rating.scss'

const setRatingGroupName = (groupName, bindElement) => {
	const stars = getElements('.js-rating__input', bindElement);

	stars.forEach(star => star.setAttribute('name', groupName));
}

const setRatingValue = (ratingValue, bindElement) => {
  const rating = getElement(`.js-rating__input[rating="${ratingValue}"]`, bindElement);
	console.log(bindElement)
  rating.setAttribute('checked', '');
};

export {setRatingGroupName, setRatingValue}
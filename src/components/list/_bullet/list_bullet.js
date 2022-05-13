import './list_bullet.scss'
import './_for-chart-legend/list_bullet_for-chart-legend.scss'

import { getElement, removeClass } from '../../../utils/utils'

const setListBullet = (itemsData, bindElement) => {
	const selector = {
		emptyItemBullet: '.js-list__item_bullet_empty',
	}
	const className = {
		emptyItemBullet: 'list__item_bullet_empty'
	}
	const firstItem = getElement(selector.emptyItemBullet, bindElement);
	if (firstItem) {
		removeClass(firstItem, className.emptyItemBullet)
	}
	const firstItemData = itemsData.shift();
	const fragment = document.createDocumentFragment();
	itemsData.forEach(itemData => {
		const newItem = firstItem.cloneNode(true);
		newItem.innerHTML = itemData;
		fragment.append(newItem);
	});

	firstItem.innerHTML = firstItemData;
	firstItem.after(fragment);	
}

export {setListBullet}
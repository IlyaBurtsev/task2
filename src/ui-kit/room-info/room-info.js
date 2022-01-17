import './room-info.scss'
import { getRoomRepository } from '../../repository/roomRepository/RoomRepositoryMock'

init()

function init() {
	let roomInfo = getRoomRepository().getRoomInfo();
	const container = document.querySelector('.room-info__container')
	if (container) {
		roomInfo.forEach((item) => {
			const itemContainer = createElement({ className: 'room-info__item-container', attrs: { "data-icon": item.infoIcon } });
			container.appendChild(itemContainer);
			const info = createElement({ className: 'room-info__information' });
			itemContainer.appendChild(info);
			info.appendChild(createElement({ className: 'room-info__title', innerHtml: item.title }));
			info.appendChild(createElement({ className: 'room-info__description', innerHtml: item.description }));

		})
	}

}

export function createElement({ tagName = 'div', className = '', innerHtml = '', id = '', attrs = {} } = {}) {
	let $element = document.createElement(tagName);
	if (className) $element.classList.add(...className.split(' '));
	if (id) $element.id = id;

	if (innerHtml) {
		$element.innerHTML = innerHtml;
	}

	if (attrs) {
		for (let attr in attrs) {
			$element.setAttribute(attr, attrs[attr]);
		}
	}

	return $element;
}
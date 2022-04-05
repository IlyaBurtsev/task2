import './room-info.scss'
import { createElement } from '../../utils/utils';
import { getRoomRepository } from '../../repository/roomRepository/RoomRepository';



export function initRoomInfo(roomNamber) {
	let roomInfo = getRoomRepository().getRoomByNumber(roomNamber).getRoomInfo();
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

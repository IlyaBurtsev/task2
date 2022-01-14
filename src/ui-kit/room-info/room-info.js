import './room-info__item/room-info__item'
import './room-info.scss'
import RoomInfoItem from './room-info__item/room-info__item'


init()

function init() {

	let roomInfo = [new RoomInfoItem('Комфорт', 'Шумопоглощающие стены', 'insert_emoticon'), new RoomInfoItem('Удобство', 'Окно в каждой из спален', 'location_city')]
	for (let i in roomInfo) {
		let item =document.querySelector('.room-info__container[data-selected= "'+roomInfo[i].title+'"]');
		item.setAttribute('data-infoIcon', roomInfo[i].infoIcon);
		item.lastChild.firstChild.innerHTML = roomInfo[i].title;
		item.lastChild.lastChild.innerHTML = roomInfo[i].description;
	}
}
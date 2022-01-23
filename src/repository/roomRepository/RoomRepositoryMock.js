import RoomRepository from './RoomRepository'
import Room from '../../models/room/Room'
import RoomInfoItem from '../../models/room/RoomInfoItem'
import { Review } from '../../models/Review';


class RoomRepositoryMock extends RoomRepository {
	constructor(room) {
		super();
		this.room = room;
	}


	getRoomInfo() {
		return this.room.roomInfo
	}

	getReviews(){
		return this.room.reviews
	}



	
}
const avatarPath = require('@assets/avatar.png');
const avatarPath2 = require('@assets/avatar2.png');
const userName = 'Мурад Сарафанов';
const userName2 = 'Патрисия Стёклышкова';
const dateCreated = '5 дней назад';
const dateCreated2 = 'неделю назад';

const content = 'Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий. И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей.'
const content2 = 'Обслуживание на высоте! Всё аккуратно, чисто. Завтраки в номер советую заказать, каждый день новое блюдо и десерт как комплимент';
const review1 = new Review({avatarPath: avatarPath, userName: userName, dateCreated: dateCreated, likeCounter: 12, likedByUsers: ['Иван Петров', 'hgh'], reviewContent: content })
const review2 = new Review({avatarPath: avatarPath2, userName: userName2, dateCreated: dateCreated2, likeCounter: 2, likedByUsers: ['hgh'], reviewContent: content2 })
const roomInfoMock = [new RoomInfoItem('Комфорт', 'Шумопоглощающие стены', "insert_emoticon"), new RoomInfoItem('Удобство', 'Окно в каждой из спален', "location_city")];
const roomReviewsMock = [review1, review2, review1]


export function getRoomRepository() {
	
	const roomRepositoryMock = new RoomRepositoryMock(new Room({roomInfo: roomInfoMock, reviews: roomReviewsMock}));
	return roomRepositoryMock;
}


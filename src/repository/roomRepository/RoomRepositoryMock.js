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
const avatarPath = 'assets/review/avatar.png';
const userName = 'Мурад Сарафановddd';
const dateCreated = '5 дней назад';
const content = 'Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий. И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей.'
const roomInfoMock = [new RoomInfoItem('Комфорт', 'Шумопоглощающие стены', "insert_emoticon"), new RoomInfoItem('Удобство', 'Окно в каждой из спален', "location_city")];
const roomReviewsMock = [new Review({avatarPath: avatarPath, userName: userName, dateCreated: dateCreated, likeCounter: 12, likedByUsers: ['Иван Петров'], reviewContent: content })]


export function getRoomRepository() {
	
	const roomRepositoryMock = new RoomRepositoryMock(new Room({roomInfo: roomInfoMock, reviews: roomReviewsMock}));
	return roomRepositoryMock;
}


import RoomRepository from './RoomRepository'
import Room from '../../models/room/Room'
import RoomInfoItem from '../../models/room/RoomInfoItem'


class RoomRepositoryMock extends RoomRepository {
	constructor(room) {
		super();
		this.room = room;
	}
	getRoomInfo() {
		return this.room.roomInfo
	}
}
export function getRoomRepository() {
	const roomInfoMock = [new RoomInfoItem('Комфорт', 'Шумопоглощающие стены', "insert_emoticon"), new RoomInfoItem('Удобство', 'Окно в каждой из спален', "location_city")];
	const roomRepositoryMock = new RoomRepositoryMock(new Room(roomInfoMock));
	return roomRepositoryMock;
}


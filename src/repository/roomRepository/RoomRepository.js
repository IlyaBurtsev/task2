import { roomMock } from "../../entities/roomMock/room";
import { showError } from "../../models/error/metodError";

 class RoomRepository {
	getRoomInfo() {
		showError('getRoomInfo');
	}

	getReviews() {
		showError('getReviews');
	}

	
}

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


export function getRoomRepository() {
	
	const roomRepositoryMock = new RoomRepositoryMock(roomMock);
	return roomRepositoryMock;
}

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
class RoomRepositoryMockPresentation extends RoomRepository {
	constructor(room) {
		super();
		this.room = room;
	}


	getRoomInfo() {
		return this.room.roomInfo.slice(0,2);
	}

	getReviews(){
		return this.room.reviews.slice(0,1)
	}
}


export function getRoomRepository() {
	
	const roomRepositoryMock = new RoomRepositoryMockPresentation(roomMock);
	return roomRepositoryMock;
}

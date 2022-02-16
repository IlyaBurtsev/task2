import { roomsMock } from "../../entities/roomMock/room";
import { showError } from "../../models/error/metodError";

 class RoomRepository {

	getRoomByNumber(number){
		showError('getRoomByNumber');
	}

	getRoomsByPrice(price){
		showError('getRoomsByPrice');
	}

	getRooms(){
		showError('getRooms');
	}

	// getRoomInfo() {
	// 	showError('getRoomInfo');
	// }

	// getReviews() {
	// 	showError('getReviews');
	// }

}

class RoomRepositoryMock extends RoomRepository {
	constructor(rooms = []) {
		super();
		this.rooms = rooms;
	}

	getRoomByNumber(number){
		return this.rooms.find(room => room.getRoomNumber() === number);
	}

	getRoomsByPrice(price){
		return this.rooms.filter(room => room.getRoomPrice <= price);
	}

	getRooms(start, end){
		const selectedRooms = this.rooms.slice((start-1), end);
		return selectedRooms;
		
	}

	
}



export function getRoomRepository() {
	
	const roomRepositoryMock = new RoomRepositoryMock(roomsMock);
	return roomRepositoryMock;
}


export default class Room{
	constructor(room){
		this.number = room.number;
		this.price = room.price;
		this.roomInfo = room.roomInfo;
		this.reviews = room.reviews;
		this.isLuxury = room.isLuxury;
	}

	getRoomNumber(){
		return this.number;
	}

	getRoomPrice(){
		return this.price;
	}


	getRoomInfo() {
		return this.roomInfo;
	}

	getReviews(){
		return this.reviews;
	}

	isLuxury(){
		return this.isLuxury;
	}
	
}
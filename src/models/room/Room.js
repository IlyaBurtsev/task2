
export default class Room{
	constructor(room){
		this.number = room.number;
		this.price = room.price;
		this.roomInfo = room.roomInfo;
		this.reviews = room.reviews;
		this.isLuxury = room.isLuxury;
		this.rating = room.rating;
		this.ratingCounter = room.ratingCounter;
		this.pictures = room.pictures;
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

	getRoomRating(){
		return this.rating;
	}

	getRoomRatingCounter(){
		return this.ratingCounter;
	}

	getRoomPictures(){
		return this.pictures;
	}
	
}
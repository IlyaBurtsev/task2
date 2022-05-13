
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
		this.mainPicture = room.mainPicture;
		this.vote = room.vote;
		this.rules = room.rules;
		this.cancelInfo = room.cancelInfo;
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
	getMainPicture() {
		return this.mainPicture;
	}

	getRoomVote () {
		return this.vote;
	}

	getRoomRules() {
		return this.rules;
	}

	getCancelInfo() {
		return this.cancelInfo;
	}

	
}
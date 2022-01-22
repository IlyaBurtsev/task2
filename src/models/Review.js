
export class Review{
	constructor(review){
		this.avatarPath = review.avatarPath;
		this.userName = review.userName;
		this.dateCreated = review.dateCreated;
		this.likeCounter = review.likeCounter;
		this.likedByUsers =[];
		this.reviewContent = review.reviewContent;
	}
}
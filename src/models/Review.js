
export class Review{
	constructor(review){
		this.creator = review.creator //- User id
		this.dateCreated = review.dateCreated;
		this.likeCounter = review.likeCounter;
		this.likedByUsers = review.likedByUsers; //- Array users id
		this.reviewContent = review.reviewContent;
	}
}
import Room from '../../models/room/Room'
import { roomReviews888Mock, roomReviewsPresentationMock} from './reviews'
import {roomInfo888Mock, roomInfoPresentationMock } from './roomInfo'

const pictures888 = [require ('@assets/888/image1.jpg'), require ('@assets/888/image2.jpg'), require ('@assets/888/image3.jpg')];
const pictures840 = [require ('@assets/840/image1.jpg')];
const pictures980 = [require ('@assets/980/image.jpg')];
const pictures856 = [require ('@assets/856/image.jpg')];
const pictures740 = [require ('@assets/980/image.jpg')];
const pictures450 = [require ('@assets/980/image.jpg')];
const pictures982 = [require ('@assets/980/image.jpg')];
const pictures678 = [require ('@assets/980/image.jpg')];350
const pictures350 = [require ('@assets/980/image.jpg')];
const pictures666 = [require ('@assets/980/image.jpg')];
const pictures444 = [require ('@assets/980/image.jpg')];
const pictures352 = [require ('@assets/980/image.jpg')];


const roomPresentationMock = new Room({ roomInfo: roomInfoPresentationMock, reviews: roomReviewsPresentationMock, number: 1, price: 9990 });
const room840Mock = new Room({ roomInfo: roomInfo888Mock, reviews: roomReviews888Mock, number: 840, price: 9900 , isLuxury: false, rating: 4, ratingCounter: 65, pictures: pictures840});
const room888Mock = new Room({ roomInfo: roomInfo888Mock, reviews: roomReviews888Mock, number: 888, price: 9990 , isLuxury: true, rating: 5, ratingCounter: 145, pictures: pictures888});
const room980Mock = new Room({ number: 980, price: 8500 , isLuxury: false, rating: 3, ratingCounter: 35, pictures: pictures980});
const room856Mock = new Room({ number: 856, price: 7300 , isLuxury: false, rating: 5, ratingCounter: 19, pictures: pictures856});
const room740Mock = new Room({ number: 740, price: 6000 , isLuxury: false, rating: 4, ratingCounter: 44, pictures: pictures740});
const room982Mock = new Room({ number: 982, price: 5800 , isLuxury: false, rating: 3, ratingCounter: 56, pictures: pictures982});
const room678Mock = new Room({ number: 678, price: 5500 , isLuxury: false, rating: 5, ratingCounter: 45, pictures: pictures678});
const room450Mock = new Room({ number: 450, price: 5300 , isLuxury: false, rating: 4, ratingCounter: 39, pictures: pictures450});
const room350Mock = new Room({ number: 350, price: 5000 , isLuxury: false, rating: 3, ratingCounter: 77, pictures: pictures350});
const room666Mock = new Room({ number: 666, price: 5000 , isLuxury: false, rating: 5, ratingCounter: 25, pictures: pictures666}); 
const room444Mock = new Room({ number: 444, price: 5000 , isLuxury: false, rating: 2, ratingCounter: 15, pictures: pictures444});
const room352Mock = new Room({ number: 352, price: 5000 , isLuxury: false, rating: 3, ratingCounter: 55, pictures: pictures352});

export const roomsMock = [room840Mock, room888Mock, room980Mock, room856Mock, room740Mock, room982Mock, room678Mock, room450Mock, room350Mock, room444Mock, room666Mock, room352Mock, roomPresentationMock]
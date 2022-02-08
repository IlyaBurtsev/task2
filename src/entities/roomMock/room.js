import Room from '../../models/room/Room'
import { roomReviews888Mock, roomReviewsPresentationMock} from './reviews'
import {roomInfo888Mock, roomInfoPresentationMock } from './roomInfo'

const pictures888 = [require ('@assets/888/image1.jpg'), require ('@assets/888/image2.jpg'), require ('@assets/888/image3.jpg')]

export const roomPresentationMock = new Room({ roomInfo: roomInfoPresentationMock, reviews: roomReviewsPresentationMock, number: 1, price: 9990 });
export const room888Mock = new Room({ roomInfo: roomInfo888Mock, reviews: roomReviews888Mock, number: 888, price: 9990 , isLuxury: true, rating: 5, ratingCounter: 145, pictures: pictures888});
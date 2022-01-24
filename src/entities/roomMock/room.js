import Room from '../../models/room/Room'
import { roomReviewsMock } from './reviews'
import { roomInfoMock } from './roomInfo'


export const roomMock = new Room({roomInfo: roomInfoMock, reviews: roomReviewsMock})
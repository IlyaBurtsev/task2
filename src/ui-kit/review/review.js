import './review.scss'
import { getRoomRepository } from '../../repository/roomRepository/RoomRepositoryMock'
import {getElement} from '../../utils/utils'

createReviews();

function createReviews(bindElement){ 
	$container = getElement(bindElement);
	getRoomRepository().getReviews();
}
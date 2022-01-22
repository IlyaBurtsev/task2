
function showError(metodName){
	throw new Error('Метод ' + metodName + ' не определен. Пожалуйста реализуйте метод.');
}
export default class RoomRepository {
	getRoomInfo() {
		showError('getRoomInfo');
	}

	getReviews() {
		showError('getReviews');
	}
}
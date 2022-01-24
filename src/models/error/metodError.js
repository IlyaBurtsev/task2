export function showError(metodName){
	throw new Error('Метод ' + metodName + ' не определен. Пожалуйста реализуйте метод.');
}
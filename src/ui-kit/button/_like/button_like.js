
$(function () {
	let likeClik = '.button_like__button'
	let liked = 'button_like__button_selected'

	$(likeClik).click(function () {
		$(this).toggleClass(liked);
		if (!isLiked) {
			updateDisplay(++likeCounter);
			isLiked = true;
		} else {
			updateDisplay(--likeCounter);
			isLiked = false;	
		}
	});
});

let likeCounter = 0;
let isLiked = false;

function updateDisplay(val) {
	document.getElementById('button_like__counter').innerHTML = val;
}

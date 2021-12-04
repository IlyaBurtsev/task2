
$(function () {
	$('.button_like__button').click(function (e, changeState) {
		if(changeState === undefined){
			$(this).toggleClass('button_like__button_selected');
		 }
		if ($(this).hasClass('button_like__button_selected')) {
			$(this).trigger('button_toggle-is-on');
		} else {
			$(this).trigger('button_toggle-is-off');
		}
	});
});
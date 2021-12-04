
$(function () {
	$('.button_toggle__off').click(function (e, changeState) {
		if(changeState === undefined){
			$(this).toggleClass('button_toggle__on');
		 }
		if ($(this).hasClass('.button_toggle__on')) {
			$(this).trigger('button_toggle-is-on');
		} else {
			$(this).trigger('button_toggle-is-off');
		}
	});
});


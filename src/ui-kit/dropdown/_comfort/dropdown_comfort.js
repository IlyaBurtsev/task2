$(function () {
	$('.dropdown__container_comfort').on('click', function (event) {

		if(event.target.closest('.dropdown__container-title_comfort')){
			$('.dropdown__container_comfort').toggleClass('dropdown__container_show');
		}
		if (event.target.className === 'dropdown-item__add-button') { 
			let n = Number($(event.target.previousSibling).html());
			if (n === 0) {
				$(event.target.previousSibling.previousSibling).addClass('dropdown-item__sub-button_active').prop('disabled', false)
				}
			$(event.target.previousSibling).html(n + 1);
			updateTitle()
		};
		if(event.target.className === 'dropdown-item__sub-button dropdown-item__sub-button_active'){
			let n = Number($(event.target.nextSibling).html())
			$(event.target.nextSibling).html(n - 1)
			if(n<2){
				$(event.target).removeClass('dropdown-item__sub-button_active')
				$(event.target).prop('disabled', true)}
			updateTitle()
		}
		if (event.target.closest('.dropdown__clear-button')) {
			clear()
			updateTitle()
		}
		if (event.target.closest('.dropdown__apply-button')) {
			$('.dropdown__container').removeClass('dropdown__container_show');
		}

	})

	function updateTitle() {
		let bedrooms = Number($('.dropdown-item__counter[data-counter="спальни"]').html())
		let beds = Number($('.dropdown-item__counter[data-counter="кровати"]').html())
		let bathrooms = Number($('.dropdown-item__counter[data-counter="ванные комнаты"]').html())
		console.log(bedrooms+' '+beds+' '+bathrooms)
	
		let title = ''
		if (bedrooms === 0) {
			title = 'Удобства в номере'
		}
		if (bedrooms === 1) {
			title = bedrooms + ' спальня'
		}
		if (bedrooms > 1 && bedrooms < 5) {
			title = bedrooms + ' спальни'
		}
		if (bedrooms > 4) {
			title = bedrooms + '  спален'
		}
		if (bedrooms >= 1 && beds === 1) {
			title += ', ' + beds + ' кровать'
		}
		if (bedrooms >= 1 && beds > 1 && beds < 5) {
			title += ', ' + beds + ' кровати'
		}
		if (bedrooms >= 1 && beds > 4) {
			title += ', ' + beds + ' кроватей'
		}
		if(bedrooms >= 1 && bathrooms ===1){
			title +=', '+bathrooms+' ванная комната'
		}
		if(bedrooms >= 1 && bathrooms >1 && bathrooms <5){
			title +=', '+bathrooms+' ванных комнаты'
		}
		if(bedrooms >= 1 &&  bathrooms >4){
			title +=', '+bathrooms+' ванных комнат'
		}

		$('.dropdown__title_comfort').html(title)
	}

})
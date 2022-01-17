import './dropdown_guests.scss'

// $(function () {
// 	$('.dropdown__container_guests').on('click', function (event) {

// 		if(event.target.closest('.dropdown__container-input_guests')){
// 			$('.dropdown__container_guests').toggleClass('dropdown__container_show');
// 		}
// 		if (event.target.className === 'dropdown-item__add-button') { 
// 			let n = Number($(event.target.previousSibling).html());
// 			if (n === 0) {
// 				$(event.target.previousSibling.previousSibling).addClass('dropdown-item__sub-button_active').prop('disabled', false)
// 				}
// 			$(event.target.previousSibling).html(n + 1);
// 			updateTitle()
// 		};
// 		if(event.target.className === 'dropdown-item__sub-button dropdown-item__sub-button_active'){
// 			let n = Number($(event.target.nextSibling).html())
// 			$(event.target.nextSibling).html(n - 1)
// 			if(n<2){
// 				$(event.target).removeClass('dropdown-item__sub-button_active')
// 				$(event.target).prop('disabled', true)}
// 			updateTitle()
// 		}
// 		if (event.target.closest('.dropdown__clear-button')) {
// 			clear()
// 			updateTitle()
// 		}
// 		if (event.target.closest('.dropdown__apply-button')) {
// 			$('.dropdown__container_guests').removeClass('dropdown__container_show');
// 		}

// 	})

// 	function updateTitle() {
// 		let adults = Number($('.dropdown-item__counter[data-counter="взрослые"]').html())
// 		let children = Number($('.dropdown-item__counter[data-counter="дети"]').html())
// 		let babies = Number($('.dropdown-item__counter[data-counter="младенцы"]').html())
// 		let guests = adults + children
// 		let title = ''
// 		if (guests === 0) {
// 			title = 'Сколько гостей?'
// 		}
// 		if (guests === 1) {
// 			title = guests + ' гость'
// 		}
// 		if (guests > 1 && guests < 5) {
// 			title = guests + ' гостя'
// 		}
// 		if (guests > 4) {
// 			title = guests + '  гостей'
// 		}
// 		if (guests >= 1 && babies === 1) {
// 			title += ', ' + babies + ' младенец'
// 		}
// 		if (guests >= 1 && babies > 1 && babies < 5) {
// 			title += ', ' + babies + ' младенца'
// 		}
// 		if (guests >= 1 && babies > 4) {
// 			title += ', ' + babies + ' младенцев'
// 		}

// 		$('.dropdown__title_guests').html(title)
// 	}

// 	function clear() {
// 		$('.dropdown-item__counter[data-counter="взрослые"]').html(0)
// 		$('.dropdown-item__counter[data-counter="дети"]').html(0)
// 		$('.dropdown-item__counter[data-counter="младенцы"]').html(0)

// 		$('.dropdown__container_guests').find('.dropdown-item__sub-button').removeClass('dropdown-item__sub-button_active')
// 	}

// })

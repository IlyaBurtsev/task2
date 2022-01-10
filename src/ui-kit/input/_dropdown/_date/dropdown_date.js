import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './dropdown_date.scss'

$(function () {

	class AirDatepickerCustom extends AirDatepicker {
		clear() {
			super.clear();
			$('.dropdown__input_date[data-selected= "departure"]').val('')
		}
		_getInputValue = (dateFormat) => {
			let { selectedDates, opts } = this,
				{ multipleDates, multipleDatesSeparator } = opts;

			if (!selectedDates.length) return '';

			let value = this.formatDate(selectedDates[0], dateFormat)

			return value;
		}

	}


	let button = {
		content: 'Применить',
		className: 'dropdown__apply-button_date',
		onClick: (dp) => {
			dp.hide();
		}
	}

	const dp = new AirDatepickerCustom('.dropdown__input_date[data-selected= "arrival"]', {
		//inline: true,
		range: true,
		multipleDatesSeparator: ' ',
		container: '#container',
		prevHtml: '<svg><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
		nextHtml: '<svg><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/></svg>',
		buttons: ['clear', button],
		navTitles: {
			days: '<i>MMMM</i> <i>yyyy</i><i></i>',
		},
		position({ $datepicker, $target, $pointer }) {
			let coords = $target.getBoundingClientRect(),
				dpHeight = $datepicker.clientHeight,
				dpWidth = $datepicker.clientWidth;

			let top = coords.y + coords.height;
			let left = coords.x;

			$datepicker.style.left = `${left}px`;
			$datepicker.style.top = `${top}px`;

			$pointer.style.display = 'none';
		},
	})


	dp.$datepicker.addEventListener('click', function () {
		if (dp.selectedDates[1]) {
			$('.dropdown__input_date[data-selected= "departure"]').val(dp.formatDate(dp.selectedDates[1], dp.locale.dateFormat));
		}
	})


	$('.dropdown__input_date[data-selected= "departure"]').on('click', function () {
		console.log(dp);
		dp.show();
	})

})



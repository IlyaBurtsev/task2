import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { getElement } from '../../../../utils/utils';
import '../dropdown.scss'
import './dropdown_date.scss'



export function initDropdownDate(inputArrival, inputDeparture, selectedDates = [], callbackFunc, startDate) {

	const $inputDeparture = getElement(inputDeparture);

	const apply = {
		content: 'Применить',
		className: 'dropdown__apply-button_date',
		onClick: (dp) => {
			dp.hide();
			callbackFunc(dp.selectedDates);
		}
	}
	const clear = {
		content: 'Очистить',
		className: 'dropdown__clear-button_date',
		onClick: (dp) => {
			dp.clear();
			$inputDeparture.value = '';
		}
	}

	let dp = new AirDatepicker(inputArrival, {
		range: true,
		multipleDatesSeparator: ' - ',
		prevHtml: '<svg><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
		nextHtml: '<svg><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/></svg>',
		buttons: [clear, apply],
		navTitles: {
			days: '<i>MMMM</i> <i>yyyy</i><i></i>',
		},
		position({ $datepicker, $target, $pointer }) {
			console.log($target.getBoundingClientRect())
			let coords = $target.getBoundingClientRect()
				
			let top = coords.y + coords.height + window.scrollY;
			let left = coords.x;

			$datepicker.style.left = `${left}px`;
			$datepicker.style.top = `${top}px`;

			$pointer.style.display = 'none';
		},
		selectedDates: selectedDates ? selectedDates : ['2022-08-19', '2022-08-23'],
		startDate: startDate ? startDate : '',
		onShow() {
			$inputDeparture.classList.add('dropdown__input_date_departure-focused'
			)
		},
		onHide() {
			$inputDeparture.classList.remove('dropdown__input_date_departure-focused')
		},
		onSelect() {
			if (dp.selectedDates[1]) {
				$inputDeparture.value = dp.formatDate(dp.selectedDates[1], dp.locale.dateFormat);
			}
			if(callbackFunc){
				callbackFunc(dp.selectedDates);
			}
		}
	})

	if (selectedDates[1]) {
		$inputDeparture.value = dp.formatDate(dp.selectedDates[1], dp.locale.dateFormat);
		callbackFunc(selectedDates);
	}

	$inputDeparture.addEventListener('click', () => {
		dp.show();
		dp.$el.focus();
	});

}









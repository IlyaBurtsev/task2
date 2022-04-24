import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import '../_date-picker/__air-datepicker/air-datepicker.scss'
import { getElement, getElements } from '../../../utils/utils';
import { clearBackgroundForRangeFrom } from './__air-datepicker/air-datepicker';
import './dropdown_date-picker.scss'
import { initMask } from '../../mask/input-mask';


//TODO изменить функцию, чтобы выбранные даты получать из html
export function initDropdownDate(bindElement, selectedDates = [], callbackFunc) {

	const doubleInput = bindElement.classList.contains('double-input-field');
	let dateFormat =  'dd MMM';
	let input ='';
	let inputs='';
	if (doubleInput) {
		const inputsContainer = getElement('.js-dropdown__inputs-container', bindElement);
		inputs = getElements('.js-input-field__input_for-dropdown', inputsContainer);
		input = inputs[0];
		initMask(input, 'ДД.ММ.ГГГГ');
		dateFormat = '';

		inputs[1].addEventListener('click', () => {
			dp.show();
			dp.$el.focus();
		});
	} else {
		input = getElement('.js-input-field__input_for-dropdown', bindElement)
	}
	

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
			doubleInput ? inputs[1].value = '':'';
		}
	}
	


	let dp = new AirDatepicker(input, {
		container: bindElement,
		range: true,
		multipleDatesSeparator: ' - ',
		prevHtml: '<svg><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
		nextHtml: '<svg><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/></svg>',
		dateFormat: dateFormat,
		buttons: [clear, apply],
		navTitles: {
			days: '<i>MMMM</i> <i>yyyy</i><i></i>',
		},
		position({ $datepicker, $target, $pointer }) {
			let top = 6;
			$datepicker.style.top = `${top}px`;

			$pointer.style.display = 'none';
		},
		selectedDates: selectedDates ? selectedDates : ['2019-08-19', '2019-08-23'],
		onShow() {
			if (dp.selectedDates.length ==1) {
				clearBackgroundForRangeFrom();
			}
			// $inputDeparture.classList.add('dropdown__input_date_departure-focused');
		},
		onHide() {
			// $inputDeparture.classList.remove('dropdown__input_date_departure-focused')
		},
		onSelect() {
			if (dp.selectedDates[1]&&doubleInput) {
				inputs[1].value = dp.formatDate(dp.selectedDates[1], dp.locale.dateFormat);
			} 
			if (dp.selectedDates.length == 1) {
				clearBackgroundForRangeFrom();
			}
			
			if (callbackFunc) {
				callbackFunc(dp.selectedDates);
			}
		}
	});
	
	if (selectedDates[1]) {
		initDropdownDate[1].value = dp.formatDate(dp.selectedDates[1], dp.locale.dateFormat);
		callbackFunc(selectedDates);
	}



}









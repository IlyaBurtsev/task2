import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './dropdown_filter-date.scss'
import './datepickerVars.scss'
import { getElement } from '../../../../utils/utils';

export function initDropdownFilterDate (bindElement, selectedDates, startDate) {

	let button = {
		content: 'Применить',
		className: 'dropdown__apply-button_date',
		onClick: (dp) => {
			dp.hide();
		}
	}


	const dp = new AirDatepicker(bindElement, {
		range: true,
		multipleDatesSeparator: ' - ',
		prevHtml: '<svg><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
		nextHtml: '<svg><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/></svg>',
		buttons: ['clear', button],
		navTitles: {
			days: '<i>MMMM</i> <i>yyyy</i><i></i>',
		},
		position({ $datepicker, $target, $pointer }) {
			console.log($target.getBoundingClientRect())
			let coords = $target.getBoundingClientRect()
			
			let top = coords.y+coords.height+ window.scrollY;
			let left = coords.x;

			$datepicker.style.left = `${left}px`;
			$datepicker.style.top = `${top}px`;

			$pointer.style.display = 'none';
		},
		selectedDates: selectedDates ?  selectedDates: ['2019-08-19', '2019-08-23'],
		startDate: startDate ? startDate: '',
		dateFormat: 'dd MMM',
		onSelect(){
			addClass();
		},
		onShow(){
			addClass();
		}
		
	})
	function addClass(){
		if(dp.selectedDates[0]){
			const $select = getElement('.-range-from-', dp.$datepicker);
			if(!$select.nextElementSibling.classList.contains('-in-range-')){
				$select.classList.add('-range-to-');
			}
		}
	}
	
}

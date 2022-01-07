import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css'; 
//import './dropdown_date.scss'
import './datepickerVars.scss'

let button = {
	content: 'Применить',
	className: 'dropdown__apply-button_date',
	onClick: (dp) => {
		dp.hide();
		let date = new Date('2021-07-26');
      dp.selectDate(date);
      dp.setViewDate(date);
	}
}

new AirDatepicker('#date',{
	range: true,
   multipleDatesSeparator: ' - ',
	inline: true,
	container: '#container',
	prevHtml: '<svg></svg>',
	nextHtml: '<svg></svg>',
	buttons: ['clear', button]
})
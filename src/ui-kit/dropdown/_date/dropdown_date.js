import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css'; 
import './dropdown_date.scss'

new AirDatepicker('#date',{
	range: true,
   multipleDatesSeparator: ' - ',
	inline: true,
	container: '#container',
	prevHtml: '<svg></svg>',
	nextHtml: '<svg></svg>',
})
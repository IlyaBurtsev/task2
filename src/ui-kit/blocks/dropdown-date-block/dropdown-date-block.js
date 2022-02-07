import './dropdown-date-block.scss'
import '../../input/input'

import { AirDatepickerCustom } from '../../input/_dropdown/_date/dropdown_date'
import { initDropdownDate } from '../../input/_dropdown/_date/dropdown_date';
import { initMask } from '../../input/mask/input-mask';

export function initDateBlock(dataSelector, selectedDates){
	// new AirDatepickerCustom(`.dropdown__input_date[data-type= "arrival-${dataSelector}"]`, `.dropdown__input_date[data-type= "departure-${dataSelector}"]`, selectedDates);
	initDropdownDate(`.dropdown__input_date[data-type= "arrival-${dataSelector}"]`, `.dropdown__input_date[data-type= "departure-${dataSelector}"]`, selectedDates)
	initMask(`.dropdown__input_date[data-type= "arrival-${dataSelector}"]`);
	// initMask(`.dropdown__input_date[data-type= "departure-${dataSelector}"]`)
}


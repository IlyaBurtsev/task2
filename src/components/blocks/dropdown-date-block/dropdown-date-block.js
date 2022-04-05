import './dropdown-date-block.scss'
import '../../input/input'

import { initDropdownDate } from '../../input/_dropdown/_date/dropdown_date';
import { initMask } from '../../input/mask/input-mask';

export function initDateBlock(dataSelector, selectedDates, callbackFunc){
	initDropdownDate(`.dropdown__input_date[data-type= "arrival-${dataSelector}"]`, `.dropdown__input_date[data-type= "departure-${dataSelector}"]`, selectedDates, callbackFunc)
	initMask(`.dropdown__input_date[data-type= "arrival-${dataSelector}"]`);
}


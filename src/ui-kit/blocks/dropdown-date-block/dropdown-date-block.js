import './dropdown-date-block.scss'
import '../../input/input'

import { AirDatepickerCustom } from '../../input/_dropdown/_date/dropdown_date'

new AirDatepickerCustom('.dropdown__input_date[data-type= "arrival"]', '.dropdown__input_date[data-type= "departure"]');
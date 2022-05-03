import './choose.scss'
import '../dropdown/dropdown'
import { initDropdowns } from '../dropdown/dropdown'
import { getElement } from '../../utils/utils'

initDropdowns(getElement('.choose__container'))


import './dropdown_comfort.scss'

import { Dropdown } from '../dropdown'

new Dropdown('.dropdown__input_comfort', {
	inputFormat: { 'спальни': ['спальня', 'спальни', 'спален'], 'кровати': ['кровать', 'кровати', 'кроватей'], 'ванные комнаты': ['ванная комната', 'ванных комнаты', 'ванных комнат'] },
	elementReadonly: true,
	visible: true,
	selectedItems: {'спальни':2, 'кровати':2, 'ванные комнаты': 0}
})
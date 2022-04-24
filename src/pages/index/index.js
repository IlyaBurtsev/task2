import './index.scss'
import '@theme/theme_custom.scss'
import '../../components/input-field/input-field'
import '../../components/checkbox/checkbox'
import '../../components/toggle/toggle'
import '../../components/radio/radio'
import '../../components/button/button'
import '../../components/title/title'
import '../../components/dropdown/dropdown'
import { bindObserverMetods } from '../../utils/observerMetods'
import { initLikeButton, likeButtonPressed } from '../../components/button/_like/button_like'

import { getElement } from '../../utils/utils'
import { Dropdown } from '../../components/dropdown/_item-quantity/Classes/Dropdown'
import { initDropdownDate } from '../../components/dropdown/_date-picker/dropdown_date-picker'



class Test {
	constructor() {
		this.init()
		this.test()
	}
	init(){
		bindObserverMetods(this)
		this.on('like', this.onClick)
	}
	test(){
		document.addEventListener('click', this.clecked)
	}
	clecked = (e) =>{
		likeButtonPressed(e, this.setLikeTrigger)
	}
	setLikeTrigger = (n, id) => {
		this.trigger('like', n, id);
	}
	onClick = (n, id) => {
		// console.log('test ok '+ n +' ' + id)
	}

}
const button = initLikeButton(document, 111111)
console.log(button)

new Test()
// new Dropdown(getElement('.js-dropdown__container'), {
// 	mergeItems:  ['взрослые', 'дети'],
// 	inputFormat: { mergeItems: ['гость', 'гостя', 'гостей'], 'младенцы': ['младенец', 'младенца', 'младенцев'] },
// 	totalMaxValue: 20,
// 	footerButtonActived: true,
// 	itemsRequired: ['взрослые'],
// 	itemsRequiredMessage: 'Без взрослых не заселяем.',
// })

initDropdownDate(getElement('.js-dropdown__container'))






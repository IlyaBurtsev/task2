import './index.scss'
import '@theme/theme_custom.scss'
import '../../components/input-field/input-field'
import '../../components/checkbox/checkbox'
import '../../components/toggle/toggle'
import '../../components/radio/radio'
import '../../components/button/button'
import '../../components/title/title'
import '../../components/dropdown/dropdown'
import '../../components/rating/rating'
import '../../components/list/list'
import '../../components/radio-block/radio-block'
import { bindObserverMetods } from '../../utils/observerMetods'
import { initLikeButton, likeButtonPressed } from '../../components/button/_like/button_like'

import { getElement, getElements } from '../../utils/utils'

import { initDateDropdown} from '../../components/dropdown/_date-picker/dropdown_date-picker'



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










import './header.scss'
import '../input/input'
import { getElement } from '../../utils/utils'

export function initHeader(singIn, bindElement){
	const $bindElement = getElement(bindElement);
	const $navBlock = getElement('.header__navigation-block', $bindElement);
	console.log($navBlock)
	if(singIn){
		$navBlock.classList.add('header__navigation-block_sing-in');
	}
}
import './header.scss'
import '../../components/list/list'
import '../../components/button/button'
import { addClass, getElement } from '../../utils/utils'

const initHeader = (bindElement, currentUser) => {
	const navBlock = getElement('.js-header__navigation-block', bindElement)
	if (currentUser){
		addClass(navBlock, 'header__navigation-block_sing-in');
		getElement('.js-header__user', navBlock).innerHTML = currentUser;
	}
}

export {initHeader}
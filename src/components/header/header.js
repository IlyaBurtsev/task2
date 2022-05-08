import './header.scss'
import '../../components/list/list'
import '../../components/button/button'
import { addClass, getElement, removeClass } from '../../utils/utils'

const initHeader = (currentUser, bindElement) => {
	const navBlock = getElement('.js-header__navigation-block', bindElement);

	if (window.matchMedia('(max-width: 1100px)').matches) {
		initBurgerMenu(navBlock);
	}
	if (currentUser){
		addClass(navBlock, 'header__navigation-block_sing-in');
		getElement('.js-header__user', navBlock).innerHTML = currentUser;
	}
}

const initBurgerMenu = (navBlock) => {
	const menu = navBlock.previousElementSibling;

	const onClickMenu = () => {	
		if (!navBlock.classList.contains('header__navigation-block_opened')) {
			addClass(navBlock, 'header__navigation-block_opened');	
			menu.style.transform = 'rotate(90deg)'
		}else {
			removeClass(navBlock, 'header__navigation-block_opened')
			menu.style.transform = 'rotate(0deg)'
		}
	}
	const openMenu = () => {
		addClass(navBlock, 'header__navigation-block_opened');	
		menu.style.transform = 'rotate(90deg)'
	}

	const closeMenu = () => {
		removeClass(navBlock, 'header__navigation-block_opened')
		menu.style.transform = 'rotate(0deg)'
	}

	navBlock.addEventListener('mouseleave', closeMenu);
	menu.addEventListener('click', openMenu)
}


export {initHeader}
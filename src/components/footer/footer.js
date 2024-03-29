import './footer.scss'
import '../../components/links-block/links-block'
import '../../components/input-field/input-field'

import { addClass, getElement} from '../../utils/utils';

const initFooterMobileDemo = (bindElement) => {
	const mobileFooter = getElement('.footer__container', bindElement);
	const footerWidth = mobileFooter.offsetWidth;
	if (footerWidth <1100) {
		addClass(mobileFooter, 'footer__container_mobile-demo')
	}
}

export {initFooterMobileDemo }
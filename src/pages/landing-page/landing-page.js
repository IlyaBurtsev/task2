import './landing-page.scss'
import '../../ui-kit/_theme/ui-kit_theme_custom.scss'
import '../../ui-kit/header/header'
import '../../ui-kit/choose/choose'
import '../../ui-kit/footer/footer'
import { initChoose } from '../../ui-kit/choose/choose'
import { initHeader } from '../../ui-kit/header/header'

initHeader(false, '.header__container');
initChoose();
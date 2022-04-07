import './headers&footers.scss'
import '../_theme/ui-kit_theme_custom.scss'
import '../../components/list/list'
import '../../components/header/header'
import '../../components/footer/footer'
import { initHeader } from '../../components/header/header'

initHeader(false, '.elements__header');

initHeader(true, '.elements__header_sing-in')
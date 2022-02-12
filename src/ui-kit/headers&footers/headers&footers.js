import './headers&footers.scss'
import '../_theme/ui-kit_theme_custom.scss'
import '../list/list'
import '../header/header'
import '../footer/footer'
import { initHeader } from '../header/header'

initHeader(false, '.elements__header');

initHeader(true, '.elements__header_sing-in')
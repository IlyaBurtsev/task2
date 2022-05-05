import './headers&footers.scss'
import '@theme/theme_custom.scss'
import '../../components/list/list'
import '../../components/header/header'
import '../../components/footer/footer'
import { initHeader } from '../../components/header/header'
import {getUserRepository} from '../../repository/userRepository/UserRepository'
import { getElement } from '../../utils/utils'

const user =getUserRepository().getCurrentUser();

initHeader(getElement('.js-header__container'));

initHeader(getElement('.js-headers-and-footers__signin-header'), user.userToString())
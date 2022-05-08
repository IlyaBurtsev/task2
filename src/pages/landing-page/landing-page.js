import './landing-page.scss'
import '@theme/theme_custom.scss'
import '../../page-templates/page-template/page-template'
import '../../components/choose/choose'


import { initHeader } from '../../components/header/header'
import { getUserRepository } from '../../repository/userRepository/UserRepository'

const user =getUserRepository().getCurrentUser().userToString();

initHeader();

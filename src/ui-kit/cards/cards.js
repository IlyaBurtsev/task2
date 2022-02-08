import './cards.scss'
import '../_theme/ui-kit_theme_custom.scss'
import '../choose/choose'
import '../registration/registration'
import '../login/login'
import '../room-card/room-card'
import '../room-preview/room-preview'

import {initRoomPreview} from '../room-preview/room-preview'
import { initDropdownFilterDate } from '../input/_dropdown/_filter-date/dropdown_filter-date'
import { initRoomCards } from '../room-card/room-card'
import { getRoomRepository } from '../../repository/roomRepository/RoomRepository'

const room = getRoomRepository().getRoomByNumber(888);


initDropdownFilterDate('.cards__datepicker', ['2019-08-19', '2019-08-23'], '2019-08-08');
initRoomCards(room);
initRoomPreview(room);

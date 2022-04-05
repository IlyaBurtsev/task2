import './cards.scss'
import '../_theme/ui-kit_theme_custom.scss'
import '../../ui-kit/choose/choose'
import '../../ui-kit/registration/registration'
import '../../ui-kit/login/login'
import '../../ui-kit/room-card/room-card'
import '../../ui-kit/room-preview/room-preview'

import {initRoomPreview} from '../../ui-kit/room-preview/room-preview'
import { initDropdownFilterDate } from '../../ui-kit/input/_dropdown/_filter-date/dropdown_filter-date'
import { initRoomCards } from '../../ui-kit/room-card/room-card'
import { getRoomRepository } from '../../repository/roomRepository/RoomRepository'

const room = getRoomRepository().getRoomByNumber(888);


initDropdownFilterDate('.cards__datepicker', ['2019-08-19', '2019-08-23'], '2019-08-08');
initRoomCards(room);
initRoomPreview(room);
initRoomPreview(getRoomRepository().getRoomByNumber(840));

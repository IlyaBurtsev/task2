import './cards.scss'
import '@theme/theme_custom.scss'
import '../../components/choose/choose'
import '../../components/registration/registration'
import '../../components/room-card/room-card'
import '../../components/login/login'
// import '../../components/room-preview/room-preview'

import { initRoomCards } from '../../components/room-card/room-card'
import { getRoomRepository } from '../../repository/roomRepository/RoomRepository'
import { getServiceRepository } from '../../repository/serviceRepository/serviceRepository'
import { calendarDemo } from '../../components/dropdown/_date-picker/dropdown_date-picker'
// import {initRoomPreview} from '../../component/room-preview/room-preview'

const room = getRoomRepository().getRoomByNumber(888);

initRoomCards(room, getServiceRepository().getServiceInfo());
calendarDemo('.cards__datepicker')
// initRoomPreview(room);
// initRoomPreview(getRoomRepository().getRoomByNumber(840));

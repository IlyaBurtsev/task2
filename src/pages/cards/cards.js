import './cards.scss';
import '@theme/theme_custom.scss';
import '../../components/choose/choose';
import '../../components/registration/registration';
import '../../components/room-card/room-card';
import '../../components/login/login';
import '../../components/room-preview/room-preview';

import initRoomPreviews from '../../components/room-preview/room-preview';

import { initRoomCards } from '../../components/room-card/room-card';
import { getRoomRepository } from '../../repository/roomRepository/RoomRepository';
import { getServiceRepository } from '../../repository/serviceRepository/serviceRepository';
import { calendarDemo } from '../../components/dropdown/_date-picker/dropdown_date-picker';
import { getElement } from '../../utils/utils';

const room888 = getRoomRepository().getRoomByNumber(888);
const room840 = getRoomRepository().getRoomByNumber(840);

initRoomCards(room888, getServiceRepository().getServiceInfo());
calendarDemo('.cards__datepicker');

initRoomPreviews([room888]);
initRoomPreviews([room840], getElement('.cards__room-preview'));

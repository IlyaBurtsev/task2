import './search-room.scss';
import '@theme/theme_custom.scss';
import '../../page-templates/page-template/page-template'

import '../../components/list/list';
import '../../components/dropdown/dropdown';
import '../../components/pagination/pagination';
import '../../components/slider/slider';
import '../../components/room-info/room-info';
import '../../components/review/review';
import '../../components/title/title';
import '../../components/room-preview/room-preview';

import { getRoomRepository } from '../../repository/roomRepository/RoomRepository';
import { initRoomPreviews } from '../../components/room-preview/room-preview';
import { initDropdowns } from '../../components/dropdown/dropdown';


const initSearchRoom = (page) => {
  const currentPage = page ? page : 1;
  const roomsData = getRoomRepository().getRooms(
    currentPage * 12 - 11,
    currentPage * 12
  );

  initDropdowns();
  initRoomPreviews(roomsData);
};

export { initSearchRoom };
initSearchRoom();

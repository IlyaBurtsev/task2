import './room-details.scss';
import '@theme/theme_custom.scss';
import '../../components/room-card/room-card';
import '../../page-templates/page-template/page-template';
import '../../components/list/list';
import '../../components/chart/chart';

import { getElement } from '../../utils/utils';
import { initRoomInfo } from '../../components/room-info/room-info';
import { initRoomCards } from '../../components/room-card/room-card';
import { initReviews } from '../../components/review/review';
import { getRoomRepository } from '../../repository/roomRepository/RoomRepository';

import { getServiceRepository } from '../../repository/serviceRepository/serviceRepository';
import { getUserRepository } from '../../repository/userRepository/UserRepository';
import { setListBullet } from '../../components/list/_bullet/list_bullet';
import { initHeader } from '../../components/header/header';
import initChart from '../../components/chart/chart';

const initRoomDetails = () => {
  const className = {
    imageContainer: '.js-room-details__picture-container',
    rulesContainer: '.js-room-details__room-rules',
  };
  const room = getRoomRepository().getRoomByNumber(888);

  const imageConteiner = getElement(className.imageContainer);

  imageConteiner.firstElementChild.firstElementChild.src =
    room.getMainPicture();

  imageConteiner.lastElementChild.firstElementChild.src =
    room.getRoomPictures()[1];
  imageConteiner.lastElementChild.lastElementChild.src =
    room.getRoomPictures()[2];

  initHeader();
  initChart(imageConteiner.nextElementSibling, room.getRoomVote());
  initRoomInfo(room);
  initRoomCards(room, getServiceRepository().getServiceInfo());
  initReviews(room.getReviews(), getUserRepository());

  const rulesContainer = getElement(className.rulesContainer);

  setListBullet(room.getRoomRules(), rulesContainer);

  rulesContainer.nextElementSibling.lastElementChild.innerHTML =
    room.getCancelInfo();
};

initRoomDetails();

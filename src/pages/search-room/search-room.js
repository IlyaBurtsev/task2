import './search-room.scss';
import '@theme/theme_custom.scss';
import '../../page-templates/page-template/page-template';

import '../../components/list/list';
import '../../components/dropdown/dropdown';
import '../../components/pagination/pagination';
import '../../components/slider/slider';
import '../../components/room-info/room-info';
import '../../components/review/review';
import '../../components/title/title';
import '../../components/room-preview/room-preview';

import { getRoomRepository } from '../../repository/roomRepository/RoomRepository';
import initRoomPreviews from '../../components/room-preview/room-preview';
import { initDropdowns } from '../../components/dropdown/dropdown';
import { initHeader } from '../../components/header/header';
import { addClass, getElement, removeClass } from '../../utils/utils';
import initSlider from '../../components/slider/slider';


const initAsidePanel = () => {
  const SELECTOR = {
    PREFERENCES: '.js-search-room__preferences-container',
  };
  const CLASS_NAME = {
    PREFERENCES_SHOW: 'search-room__preferences-container_show',
    ASIDE_BUTTON_PANEL_SHOWN: 'search-room__aside-button_panel-shown',
  };
  const preferences = getElement(SELECTOR.PREFERENCES);
  const button = preferences.previousElementSibling.firstElementChild;

  const showPanel = () => {
    addClass(preferences, CLASS_NAME.PREFERENCES_SHOW);
    addClass(button, CLASS_NAME.ASIDE_BUTTON_PANEL_SHOWN);
  };
  const closePanel = () => {
    removeClass(preferences, CLASS_NAME.PREFERENCES_SHOW);
    removeClass(button, CLASS_NAME.ASIDE_BUTTON_PANEL_SHOWN);
  };
  const onClickButton = (e) => {
    if (!e.target.classList.contains(CLASS_NAME.ASIDE_BUTTON_PANEL_SHOWN)) {
      showPanel();
    } else {
      closePanel();
    }
  };

  button.addEventListener('click', onClickButton);
};

const initSearchRoom = (page) => {
  const currentPage = page ? page : 1;
  const roomsData = getRoomRepository().getRooms(
    currentPage * 12 - 11,
    currentPage * 12
  );
  initAsidePanel();
  initHeader();
  initDropdowns();
	initSlider();
  initRoomPreviews(roomsData);
};

initSearchRoom();

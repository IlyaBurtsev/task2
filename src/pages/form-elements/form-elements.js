import './form-elements.scss';
import '../../components/pagination/pagination';
import '../../components/slider/slider';
import '../../components/room-info/room-info';
import '@theme/theme_custom.scss';
import '../../components/input-field/input-field';
import '../../components/checkbox/checkbox';
import '../../components/toggle/toggle';
import '../../components/radio/radio';
import '../../components/button/button';
import '../../components/title/title';
import '../../components/dropdown/dropdown';
import '../../components/rating/rating';
import '../../components/list/list';
import '../../components/radio-block/radio-block';
import '../../components/review/review';
import { initRoomInfo } from '../../components/room-info/room-info';
import { initReviews } from '../../components/review/review';
import { getRoomRepository } from '../../repository/roomRepository/RoomRepository';
import { getUserRepository } from '../../repository/userRepository/UserRepository';
import { initDropdowns } from '../../components/dropdown/dropdown';
import initButton from '../../components/button/button';
import { getElement } from '../../utils/utils';
import initSlider from '../../components/slider/slider';
const dropdowns = []
initDropdowns(document, dropdowns);

dropdowns[0].updateDropdownOptions({
	startValues:0
})
dropdowns[3].updateDropdownOptions({
	startValues:0
})

initSlider()
const demoRoom = getRoomRepository().getRoomByNumber(1);
const buttonContainer = getElement('.js-form-elements__like-container');

for (let button of buttonContainer.children) {
  const setData = () => {
    if (component.isSelected()) {
      component.decrementValue();
      component.removeSelected();
    } else {
      component.incrementValue();
      component.setSelected();
    }
  };
  const component = initButton(button);
  button.addEventListener('click', setData);
}

initRoomInfo(demoRoom);
initReviews(demoRoom.getReviews(), getUserRepository(), document);

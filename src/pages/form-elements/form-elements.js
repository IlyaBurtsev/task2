import './form-elements.scss'
import '../../components/pagination/pagination'
import '../../components/slider/slider'
import '../../components/room-info/room-info'
import '@theme/theme_custom.scss'
import '../../components/input-field/input-field'
import '../../components/checkbox/checkbox'
import '../../components/toggle/toggle'
import '../../components/radio/radio'
import '../../components/button/button'
import '../../components/title/title'
import '../../components/dropdown/dropdown'
import '../../components/rating/rating'
import '../../components/list/list'
import '../../components/radio-block/radio-block'
import '../../components/review/review'
import { likeButtonDemo} from '../../components/button/_like/button_like'
import { initRoomInfo } from '../../components/room-info/room-info'
import { initReviews } from '../../components/review/review'
import { getRoomRepository } from '../../repository/roomRepository/RoomRepository'
import { getUserRepository } from '../../repository/userRepository/UserRepository'
import { initDropdowns } from '../../components/dropdown/dropdown'

initDropdowns()

const demoRoom = getRoomRepository().getRoomByNumber(1);
likeButtonDemo();

initRoomInfo(demoRoom);
initReviews(demoRoom.getReviews(), document, getUserRepository())






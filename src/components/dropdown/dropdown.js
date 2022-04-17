import './dropdown.scss';
import './__dropdown-item/dropdown-item.scss';
// import '../_filter-date/dropdown_filter-date';
// import '../_date/dropdown_date';
// import '../_guests/dropdown_guests';
// import '../_comfort/dropdown_comfort';
import {
  addClass,
  getElement,
  getElements,
  removeClass,
  showWarning,
} from '../../utils/utils';
import { getItemSelector } from './__dropdown-item/dropdown-item';

const setInputValue = (value, dropdown) => {
  getElement('.js-input_for-dropdown', dropdown).value = value;
  return true;
};

const switchToOpenState = (dropdown) => {
  addClass(dropdown, 'dropdown__container_open');
};

const switchToClosedState = (dropdown) => {
  removeClass(dropdown, 'dropdown__container_open');
};
// const initItemNames = (dropdown, itemNames) => {
//   let items = getElements(getItemSelector, dropdown);
//   if (items.length === itemNames.length) {
//     items.array.forEach((element, i = 0) => {
// 			element.setAttribute('itemName', itemNames[i])
//       element.value = itemNames[i++];
//     });
//   } else {
//     if (items.length) {
//       showWarning(
//         'Колличество наименований в объявлении дропдауна не совпадает с разметкой в ' +
//           dropdown
//       );
//       return false;
//     }
// 		showWarning('Элементы не найдены в ' +	dropdown);
//   }
//   return true;
// };

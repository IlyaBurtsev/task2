import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import ru from './__air-datepicker/locale/ru';
import '../_date-picker/__air-datepicker/air-datepicker.scss';

import { getElement, getElements } from '../../../utils/utils';
import { clearBackgroundForRangeFrom } from './__air-datepicker/air-datepicker';
import { initMask } from '../../mask/input-mask';

const getButtons = (callbackFunc, doubleInput, element) => {
  const apply = {
    content: 'Применить',
    className: 'dropdown__apply-button_date',
    onClick: (dp) => {
      dp.hide();
      if (typeof callbackFunc === 'function') {
        callbackFunc(dp.selectedDates);
      }
    },
  };

  const clear = {
    content: 'Очистить',
    className: 'dropdown__clear-button_date',
    onClick: (dp) => {
      dp.clear();
      doubleInput ? (element.value = '') : '';
      if (typeof callbackFunc === 'function') {
        callbackFunc(dp.selectedDates);
      }
    },
  };
  return [clear, apply];
};
const initDateDropdown = (bindElement, callbackFunc) => {
  const className = {
    doubleInput: 'double-input-field',
    doubleInputContainer: 'js-dropdown__inputs-container',
    input: 'js-input-field__input_for-date-dropdown',
    openedDropdown: 'dropdown__container_date-picker_open',
  };
  const doubleInput = bindElement.classList.contains(className.doubleInput);

  let selectedDates = [];
  let startDate = new Date();
  let dateFormat = 'dd MMM';
  let input = '';
  let inputs = '';
  let inited = false;
  let mobileViewSettings = '';

  if (doubleInput) {
    const inputsContainer = getElement(
      `.${className.doubleInputContainer}`,
      bindElement
    );
    inputs = getElements(`.${className.input}`, inputsContainer);
    input = inputs[0];
    dateFormat = '';
    if (input.value.split(' ')[1]) {
      selectedDates = input.value.split(' ');
      startDate = '2019-08-08';
    } else {
      input.value = '';
      if (!inputs[1].value) {
        inputs[1].value = '';
      }
    }
    inputs[1].addEventListener('click', () => {
      dp.show();
      dp.$el.focus();
    });
  } else {
    input = getElement(`.${className.input}`, bindElement);
    input.value ? (selectedDates = input.value.split(' ')) : '';
  }

  doubleInput ? initMask(input, 'ДД.ММ.ГГГГ') : '';

  const updateSecondInputView = () => {
    if (doubleInput) {
      if (dp.selectedDates.length > 1) {
        inputs[1].value = dp.formatDate(
          dp.selectedDates[1],
          dp.locale.dateFormat
        );
      } else {
        if (dp.selectedDates.length) inputs[1].value = '';
      }
    }
  };
  const setCallback = (callbackFunc, selectedDates) => {
    if (typeof callbackFunc == 'function') {
      if (selectedDates.length == 2) {
        callbackFunc(selectedDates);
      }
    }
  };

  const updateCellViewWhenOneDateSelected = (selectedDates) => {
    if (selectedDates.length == 1) {
      clearBackgroundForRangeFrom();
    }
  };

  const checkScreenSize = () => {
    if (window.screen.width <= 420) {
      mobileViewSettings = {
        container: '',
        isMobile: true,
        position: '',
      };
    }
  };

  checkScreenSize();

  let dp = new AirDatepicker(input, {
    startDate: startDate,
    locale: ru,
    container: bindElement,
    visible: bindElement.classList.contains(className.openedDropdown),
    range: true,
    multipleDatesSeparator: ' - ',
    prevHtml:
      '<svg><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
    nextHtml:
      '<svg><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/></svg>',
    dateFormat: dateFormat,

    buttons: getButtons(callbackFunc, doubleInput, inputs[1]),

    navTitles: {
      days: '<i>MMMM</i> <i>yyyy</i><i></i>',
    },

    selectedDates: selectedDates ? selectedDates : '',

    position({ $datepicker, $pointer }) {
      $datepicker.style.top = `70px`;
      $pointer.style.display = 'none';
    },

    ...mobileViewSettings,

    onSelect() {
      updateCellViewWhenOneDateSelected(dp.selectedDates);
      updateSecondInputView();
      if (typeof callbackFunc === 'function') {
        setCallback(callbackFunc, dp.selectedDates);
      }
    },

    onShow() {
      if (!inited) {
        updateCellViewWhenOneDateSelected(selectedDates);
      } else {
        updateCellViewWhenOneDateSelected(dp.selectedDates);
      }
    },
  });

  updateSecondInputView();
  setCallback(callbackFunc, selectedDates);
};

const calendarDemo = (selector) => {
  const dp = new AirDatepicker(selector, {
    startDate: '2019-08-08',
    range: true,
    multipleDatesSeparator: ' - ',
    prevHtml:
      '<svg><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
    nextHtml:
      '<svg><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/></svg>',
    selectedDates: ['2019-08-19', '2019-08-23'],
    navTitles: {
      days: '<i>MMMM</i> <i>yyyy</i><i></i>',
    },
    buttons: getButtons(false),
  });

  console.log(dp.selectedDates);
};

export { initDateDropdown, calendarDemo };

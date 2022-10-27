import './dropdown_item-quantity.scss';
import './__dropdown-item/dropdown-item.scss';
import dropdownCreator from 'dropdown/dropdown/dropdown';
import { getElement } from '../../../utils/utils';
import initDefaultItem from './__dropdown-item/dropdown-item';
import initButton from '../../button/button';
const initQuantityDropdown = (bindElement, callback, startValues) => {
  const component = initComponentDropdown(bindElement);
  const { view, switchButtonToActive, switchButtonToDisable } = component;
  const { createDropdownPlugin, ChangeStateTypes: dropdownChangeTypes } =
    dropdownCreator;
  const { dropdown } = view;
  const clearButtonComponent = initButton(dropdown);
  const { button: clearButton } = clearButtonComponent;
  const titleNames = [];
  const itemNames = [];
  let values = [];
  let dropdownPlugin;
  if (clearButton) {
    titleNames.push(
      ['гость', 'гостя', 'гостей'],
      ['младенец', 'младенца', 'младенцев']
    );
    itemNames.push('взрослые', 'дети', 'младенцы');
    values.push(2, 1, 0);
  } else {
    titleNames.push(
      ['спальня', 'спальни', 'спален'],
      ['кровать', 'кровати   ', 'кроватей'],
      ['ванная комната', 'ванных комнаты', 'ванных комнат']
    );
    itemNames.push('спальни', 'кровати', 'ванные комнаты');
    values.push(2, 2, 0);
  }
  dropdownPlugin = createDropdownPlugin(view, {
    itemNames: itemNames,
    startValues: startValues ? startValues : values,
    externalCheckState: customCheck,
  });
  dropdownPlugin.changeTitle(changeTitle(values, titleNames));

  dropdownPlugin.subscribeToChangeState(onChangeState);
  setParametrs();
  if (clearButton) {
    const applayButtonComponent = initButton(
      clearButton.parentElement.nextElementSibling
    );
    const applayButton = applayButtonComponent.button;
    clearButton.addEventListener('click', onClickClearButton);
    applayButton.addEventListener('click', onClickApplayButton);
  }

  function onClickClearButton() {
    dropdownPlugin.updateDropdownOptions({ startValues: [] });
    setParametrs();
  }

  function onClickApplayButton() {
    dropdownPlugin.closedDropdown();
    if (values.length === 3) {
      if (typeof callback === 'function') {
        callback(values);
      }
    }
  }

  function setParametrs() {
    if (clearButton) {
      dropdownPlugin.changeItemParametrs({ maxValue: 5 }, 0);
      dropdownPlugin.changeItemParametrs({ maxValue: 3 }, 1);
      dropdownPlugin.changeItemParametrs({ maxValue: 2 }, 2);
    } else {
      dropdownPlugin.changeItemParametrs({ maxValue: 3 }, 0);
      dropdownPlugin.changeItemParametrs({ maxValue: 8 }, 1);
      dropdownPlugin.changeItemParametrs({ maxValue: 3 }, 2);
    }
  }

  function onChangeState(state, payload) {
    const { itemStates } = state;
    const { id, changeType } = payload;
    values = [];
    let summ = 0;
    if (
      changeType === dropdownChangeTypes.addButtonClicked ||
      changeType === dropdownChangeTypes.subButtonClicked ||
      changeType === dropdownChangeTypes.changeItem
    ) {
      itemStates.forEach((state) => {
        summ += state.value;
        values.push(state.value);
      });
      if (summ > 0 && values[0] === 0 && clearButton) {
        dropdownPlugin.changeTitle('Без взрослых не заселяем!');
        return;
      }
      if (summ > 0 && values[0] === 0 && !clearButton) {
        dropdownPlugin.changeTitle('Выберите колличество спален.');
        return;
      }
      changeTitle(values, titleNames);
    }
  }

  function changeTitle(values, names) {
    let result = '';
    if (values.length === names.length) {
      result = switchResult(values[0], names[0]);
      names.forEach((name, index) => {
        if (index > 0 && values[index]) {
          result += `, ${switchResult(values[index], name)}`;
          if (!values[index - 1]) {
            result = switchResult(values[index], name);
          }
        }
      });
    } else {
      const adults = values[0] + values[1];
      const adultsString = switchResult(adults, names[0]);
      let childrenString = switchResult(values[2], names[1]);
      if (adultsString && childrenString) {
        childrenString = ', ' + childrenString;
      }
      result = adultsString + childrenString;
    }
    dropdownPlugin.changeTitle(result);
  }

  function customCheck(state, id, type) {
    const { itemStates } = state;
    const currentItem = itemStates[id];
    const { minValue, maxValue } = currentItem;
    let { value } = currentItem;

    if (value === minValue) {
      switchButtonToDisable(dropdown, id, false);
    } else {
      switchButtonToActive(dropdown, id, false);
    }
    if (value === maxValue) {
      switchButtonToDisable(dropdown, id, true);
    } else {
      switchButtonToActive(dropdown, id, true);
    }
    currentItem.value = Number(value.toFixed(1));
    return state;
  }
  return dropdownPlugin;
};

function switchResult(itemValue, itemName) {
  let result = '';
  switch (itemValue) {
    case 0:
      result = '';
      break;
    case 1:
      result = itemValue + ' ' + itemName[0];
      break;
    case 2:
    case 3:
    case 4:
      result = itemValue + ' ' + itemName[1];
      break;

    default:
      result = itemValue + ' ' + itemName[2];
  }
  return result;
}

function initComponentDropdown(bindElement) {
  const className = {
    dropdownContainer: 'js-dropdown__container',
    input: 'js-input-field__input_for-items-dropdown',
    closedButton: 'js-button__container_link',
    dropdownOpen: 'dropdown__container_item-quantity_open',
    buttonActive: 'dropdown-item__button_active',
  };

  let container;
  if (bindElement.classList.contains(className.dropdownContainer)) {
    container = bindElement;
  } else {
    container = getElement(`.${className.dropdownContainer}`, bindElement);
  }

  if (container === null) {
    throw new Error('Dropdown container is null!');
  }
  function setValueToInput(value) {
    getElement(`.${className.input}`, container).value = value;
  }
  const defaultItemComponent = initDefaultItem(container);
  const { item, switchToActive, switchToDisable } = defaultItemComponent;
  const { setValue } = item;
  const openDropdown = () => {
    container.classList.add(className.dropdownOpen);
  };
  const closedDropdown = () => {
    container.classList.remove(className.dropdownOpen);
  };
  const switchButtonToActive = (dropdown, id, add) => {
    const item = dropdown.lastElementChild?.children[id];
    switchToActive(item, add);
  };

  const setValueToItem = (value, dropdown, id) => {
    const item = dropdown.lastElementChild?.children[id];
    setValue(`${value}`, item);
  };

  const switchButtonToDisable = (dropdown, id, add) => {
    const item = dropdown.lastElementChild?.children[id];
    switchToDisable(item, add);
  };

  const getToggleElement = (dropdown, id) => {
    const item = dropdown.lastElementChild?.children[id];
    return getToggle(item);
  };

  const getClosedButton = (dropdown) => {
    return getElement(`.${className.closedButton}`, dropdown);
  };

  const view = {
    dropdown: container,
    setValueToInput,
    openDropdown,
    closedDropdown,
    item,
  };

  return {
    view,
    switchButtonToActive,
    switchButtonToDisable,
    setValueToItem,
    getToggleElement,
    getClosedButton,
  };
}

export { initQuantityDropdown };

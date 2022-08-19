import {
  getElement,
} from '../../../../utils/utils';


const initDefaultItem = (bindElement) => {
  const className = {
    itemContainer: 'js-dropdown-item__container',
    title: 'js-dropdown-item__title',
    counter: 'js-dropdown-item__counter',
    addButton: 'js-dropdown-item__add-button',
    subButton: 'js-dropdown-item__sub-button',
    buttonActive: 'dropdown-item__button_active',
  };
  const container = getElement(`.${className.itemContainer}`, bindElement)
  if (container === null) {
    throw new Error('Default item container is null!');
  }

  const setValue = (value, parentElement) => {
    const counter = getElement(`.${className.counter}`, parentElement);
    if (counter !== null) {
      counter.value = value;
    }
  };

  const setItemName = (name, parentElement) => {
    const title = getElement(`.${className.title}`, parentElement);
    if (title !== null) {
      title.innerHTML = name;
    }
  };

  const item = {
    container: container,
    addButtonClassName: className.addButton,
    subButtonClassName: className.subButton,
    setValue: setValue,
    setItemName: setItemName,
  };
  const switchToActive = (item, add) => {
    if (item !== null) {
      let button;
      if (add) {
        button = getElement(`.${className.addButton}`, item);
      } else {
        button = getElement(`.${className.subButton}`, item);
      }
      if (button !== null) {
        if (!button.classList.contains(className.buttonActive)) {
          button.classList.add(className.buttonActive);
          button.removeAttribute('disabled');
        }
      }
    }
  };

  const switchToDisable = (item, add) => {

    if (item !== null) {
      let button;
      if (add) {
        button =getElement(`.${className.addButton}`, item);
      } else {
        button =getElement(`.${className.subButton}`, item);
      }
      if (button !== null) {
        if (button.classList.contains(className.buttonActive)) {
          button.classList.remove(className.buttonActive);
          button.setAttribute('disabled', '');
        }
      }
    }
  };
  return {
    item: item,
    switchToActive: switchToActive,
    switchToDisable: switchToDisable,
  };
};

export default initDefaultItem;
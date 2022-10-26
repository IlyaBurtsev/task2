import sliderCreator from 'slider/range-slider/range-slider';
import './slider.scss';
const initSlider = () => {
  const initSliderView = (bindElement) => {
    const className = {
      handler: 'slider__handler',
    };
    const handler = bindElement.querySelector(`.${className.handler}`);

    return {
      slider: handler.parentElement,
      handlerElement: handler,
      progressBar: handler.nextElementSibling,
    };
  };

  const sliderView = initSliderView(document);
  const sliderPlugin = sliderCreator.createSliderPlugin(sliderView, {
    numberOfHandlers: 2,
    minValue: 300,
    maxValue: 15800,
    step: 100,
    startValues: [5000, 10000],
    progressBar: true,
  });

  const setValues = (lowValue, highValue) => {
    let dataRange = document.querySelector('.slider__data-range');
    let formatter = new Intl.NumberFormat('Ru', {
      style: 'decimal',
      maximumFractionDigits: 0,
    });
    dataRange.innerHTML = `${formatter.format(lowValue)}₽ - ${formatter.format( highValue)}₽`;
  };
  const onChangeValue = (state) => {
    const { valuesState } = state;
    const [lowValue, highValue] = valuesState.values;
    setValues(lowValue, highValue);
  };
  setValues(sliderPlugin.getHandlerValue(0), sliderPlugin.getHandlerValue(1));
  sliderPlugin.subscribeToChangeState(onChangeValue);
};

export default initSlider;

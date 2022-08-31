import { bindObserverMetods } from '../../../utils/observerMetods';

const previewConsts = {
  changeImagePosition: 'changeImagePosition',
};

class RoomPreview {
  constructor(componentPreview, previewData) {
    this.previewData = previewData;
    this.currentImagePosition = 0;
    this.sliderNavButtons = [];
    this.component = componentPreview;

    this.init();
  }

  init() {
    const {
      slider,
      preview,
      imageContainer,
      setTitlePreview,
      initRatingBlock,
      removeEmptyContainer,
    } = this.component;
    if (this.previewData) {
      removeEmptyContainer();
    } else return;
    this.preview = preview;
    bindObserverMetods(this);
    this.bindEvents();

    this.imagePaths = this.previewData.getRoomPictures();
    this.slider = slider;
    this.imageContainer = imageContainer;

    this.setImageSlider(this.imagePaths);
    setTitlePreview({
      roomNumber: this.previewData.getRoomNumber(),
      isLuxury: this.previewData.isLuxury,
      roomPrice: this.previewData.getRoomPrice(),
    });

    initRatingBlock({
      ratingValue: this.previewData.getRoomRating(),
      ratingCount: this.previewData.getRoomRatingCounter(),
      groupName: this.previewData.getRoomNumber(),
    });
  }

  setImageSlider = (imagePaths) => {
    const { createSliderNavButton, createImg, navButtonsContainer } =
      this.component;
    const imgFragment = document.createDocumentFragment();
    const buttonsFragment = document.createDocumentFragment();

    imagePaths.forEach((imagePath, position) => {
      imgFragment.append(createImg(imagePath));
      const button = createSliderNavButton(position);
      buttonsFragment.append(button);
      this.sliderNavButtons.push(button);
    });
    this.imageContainer.append(imgFragment);
    navButtonsContainer.append(buttonsFragment);
    this.currentSliderNavButton =
      this.sliderNavButtons[this.currentImagePosition];
    this.trigger(previewConsts.changeImagePosition);
  };

  bindEvents() {
    this.preview.addEventListener('click', this.onClickPreview);
    this.on(previewConsts.changeImagePosition, this.onChangeImagePosition);
  }

  onClickPreview = (e) => {
    const {
      sliderNextButtonPressed,
      sliderPreviousButtonPressed,
      sliderNavButtonPressed,
    } = this.component;
    sliderNextButtonPressed(e.target) ? this.showNextImage() : '';
    sliderPreviousButtonPressed(e.target) ? this.showPreviousImage() : '';
    const position = sliderNavButtonPressed(e.target);
    position ? this.showSelectedImage(position) : '';
  };

  onChangeImagePosition = () => {
    this.setNavButtonCurrentPosition();
  };

  showNextImage = () => {
    if (this.currentImagePosition < this.imagePaths.length - 1) {
      this.imageContainer.style.transform = `translate(${
        -27 * ++this.currentImagePosition
      }rem, 0)`;
    } else {
      this.currentImagePosition = 0;
      this.imageContainer.style.transform = `translate(${
        -27 * this.currentImagePosition
      }rem, 0)`;
    }
    this.trigger(previewConsts.changeImagePosition);
  };

  showPreviousImage = () => {
    if (this.currentImagePosition > 0) {
      this.imageContainer.style.transform = `translate(${
        -27 * --this.currentImagePosition
      }rem, 0)`;
    } else {
      this.currentImagePosition = this.imagePaths.length;
      this.imageContainer.style.transform = `translate(${
        -27 * --this.currentImagePosition
      }rem, 0)`;
    }
    this.trigger(previewConsts.changeImagePosition);
  };

  showSelectedImage = (position) => {
    this.currentImagePosition = position;
    this.imageContainer.style.transform = `translate(${
      -27 * this.currentImagePosition
    }rem, 0)`;
    this.trigger(previewConsts.changeImagePosition);
  };

  setNavButtonCurrentPosition = () => {
    const { setNavButtonSelected, removeNavButtonSelected } = this.component;
    removeNavButtonSelected(this.currentSliderNavButton);
    const currentButton = this.sliderNavButtons[this.currentImagePosition];
    setNavButtonSelected(currentButton);
    this.currentSliderNavButton = currentButton;
  };
}

export default RoomPreview;

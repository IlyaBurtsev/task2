import { bindObserverMetods } from '../../../utils/observerMetods';
import {
  bindRoomPreview,
  createImg,
  createSliderNavButton,
  getImageContainer,
  getNavButtonsContainer,
  getSlider,
  initRatingBlock,
  removeNavButtonSelected,
  setNavButtonSelected,
  setTitlePreview,
  sliderNavButtonPressed,
  sliderNextButtonPressed,
  sliderPreviousButtonPressed,
} from '../room-preview';

const previewConsts = {
  changeImagePosition: 'changeImagePosition',
};

class RoomPreview {
  constructor(bindElement, previewData) {
    this.preview = bindElement;
    this.previewData = previewData;
    this.currentImagePosition = 0;
    this.sliderNavButtons = [];

    this.init();
  }

  init() {
    if (this.previewData) {
      bindRoomPreview(this.preview);
    } else return;

    bindObserverMetods(this);

		this.bindEvents();

    this.imagePaths = this.previewData.getRoomPictures();
		this.slider = getSlider(this.preview);
    this.imageContainer = getImageContainer(this.slider);

    this.setImageSlider(this.imagePaths);
    setTitlePreview(this.preview, {
      roomNumber: this.previewData.getRoomNumber(),
      isLuxury: this.previewData.isLuxury,
      roomPrice: this.previewData.getRoomPrice(),
    });
		
		initRatingBlock({
			ratingValue: this.previewData.getRoomRating(),
			ratingCount: this.previewData.getRoomRatingCounter(),
			groupName: this.previewData.getRoomNumber(),
			bindElement: this.preview,
		})
  }

  setImageSlider = (imagePaths) => {
    const imgFragment = document.createDocumentFragment();
    const buttonsFragment = document.createDocumentFragment();

    imagePaths.forEach((imagePath, position) => {
      imgFragment.append(createImg(imagePath));
      const button = createSliderNavButton(position);
      buttonsFragment.append(button);
      this.sliderNavButtons.push(button);
    });
    this.imageContainer.append(imgFragment);
    getNavButtonsContainer(this.preview).append(buttonsFragment);
    this.currentSliderNavButton =
      this.sliderNavButtons[this.currentImagePosition];
		this.trigger(previewConsts.changeImagePosition);
		
  };

  bindEvents() {
    this.preview.addEventListener('click', this.onClickPreview);
    this.on(previewConsts.changeImagePosition, this.onChangeImagePosition);
  }

  onClickPreview = (e) => {
    sliderNextButtonPressed(e.target) ? this.showNextImage() : '';
    sliderPreviousButtonPressed(e.target) ? this.showPreviousImage() : '';
    const position = sliderNavButtonPressed(e.target) ;
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
    removeNavButtonSelected(this.currentSliderNavButton);
    const currentButton = this.sliderNavButtons[this.currentImagePosition];
    setNavButtonSelected(currentButton);
    this.currentSliderNavButton = currentButton;
  };
}

export { RoomPreview };

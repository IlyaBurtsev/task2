import 'nouislider/dist/nouislider.css';
import './slider.scss'


let slider = document.querySelector('.slider__container ')
console.log(slider)

noUiSlider.create(slider,{
	start: [20, 80],
	connect: true,
	range: {
		'min': 0,
		'max': 100
	}
})
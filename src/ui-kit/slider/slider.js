import 'nouislider/dist/nouislider.css';
import './slider.scss'
slider()
function slider(minPrice=0.5, maxPrice=15.5, startLowPrice=5, startHighPrice=10) {
	let slider = document.querySelector('.slider__range-slider')
	let dataRange = document.querySelector('.slider__data-range')

	noUiSlider.create(slider, {
		start: [startLowPrice, startHighPrice],
		connect: true,
		range: {
			'min': minPrice,
			'max': maxPrice
		}
	})

	//slider.noUiSlider.on('update', updateDataRange(values, handle))
	let lowValue = startLowPrice;
	let highValue = startHighPrice;
	let formatter = new Intl.NumberFormat('Ru', {
		style: 'currency',
		currency: 'Rub',
		maximumFractionDigits: 0,
	})
	slider.noUiSlider.on('update', function (values, handle) {
		let value = values[handle]

		if (handle) {
			highValue = formatter.format(value * 1000);
		} else {
			lowValue = formatter.format(value * 1000);
		}
		dataRange.innerHTML = lowValue + ' - ' + highValue;
	})

}

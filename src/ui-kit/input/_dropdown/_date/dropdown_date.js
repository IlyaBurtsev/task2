import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import '../dropdown.scss'
import './dropdown_date.scss'

//init()
function init() {

	class AirDatepickerCustom extends AirDatepicker {
		constructor(inputArrival, inputDeparture) {
			super(inputArrival, {
				range: true,
				multipleDatesSeparator: ' ',
				container: '#container',
				prevHtml: '<svg><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#BC9CFF"/></svg>',
				nextHtml: '<svg><path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/></svg>',
				buttons: ['clear', button],
				navTitles: {
					days: '<i>MMMM</i> <i>yyyy</i><i></i>',
				},
				position({ $datepicker, $target, $pointer }) {
					let coords = $target.getBoundingClientRect(),
						dpHeight = $datepicker.clientHeight,
						dpWidth = $datepicker.clientWidth;

					let top = coords.y + coords.height;
					let left = coords.x;

					$datepicker.style.left = `${left}px`;
					$datepicker.style.top = `${top}px`;

					$pointer.style.display = 'none';
				},
			});
			this.$inputDeparture = document.querySelector(inputDeparture);
			this.$inputDeparture.addEventListener('click', this.onClickInputDeparture);

		}
		show(){
			super.show();
			this.$inputDeparture.classList.add('input-field__input_dropdown-date_departure-focused');
		}
		hide(){
			super.hide();
			this.$inputDeparture.classList.remove('input-field__input_dropdown-date_departure-focused');
		}


		onClickInputDeparture = () => {
			this.show()
			this.$el.focus()	
		}

		clear() {
			super.clear();
			this.$el.value = '';
			this.$inputDeparture.value = '';

		}

		_setInputValue = () => {
			let { opts, locale: { dateFormat } } = this,
				{} = opts;
			if (this.selectedDates[0]) {
				this.$el.value = this.formatDate(this.selectedDates[0], dateFormat);
			}

			if (this.selectedDates[1]) {
				this.$inputDeparture.value = this.formatDate(this.selectedDates[1], dateFormat);
			}
		}

	}


	let button = {
		content: 'Применить',
		className: 'dropdown__apply-button_date',
		onClick: (dp) => {
			if (dp.selectedDates[0] && dp.selectedDates[1]) {
				dp.hide();
			}
		}
	}

	new AirDatepickerCustom('.input-field__input_dropdown-date[data-selected= "arrival"]', '.input-field__input_dropdown-date[data-selected= "departure"]');


}



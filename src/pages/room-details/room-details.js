import './room-details.scss';
import '../../ui-kit/_theme/ui-kit_theme_custom.scss'
import '../../ui-kit/header/header';
import Chart from 'chart.js/auto';
import { getElement } from '../../utils/utils';

const ctx =getElement('.room-details__chart').getContext('2d');

const amazing = ctx.createLinearGradient(0, 0, 0, 170);
amazing.addColorStop(0, ' #FFE39C');
amazing.addColorStop(1, '#FFBA9C');

const good = ctx.createLinearGradient(0, 0, 0, 170);
good.addColorStop(0, ' #FFE39C');
good.addColorStop(1, '#FFBA9C');

const satisfactorily = ctx.createLinearGradient(0, 0, 0, 170);
satisfactorily.addColorStop(0, ' #FFE39C');
satisfactorily.addColorStop(1, '#FFBA9C');


 const colors = {'#919191':' #3D4975',  '#BC9CFF': '#8BA4F9', '#6FCF97': '#66D2EA', '#FFE39C':'#FFBA9C'}

 const backgroundColors = [];
 Object.keys(colors).forEach(key => {
	 let gradient = ctx.createLinearGradient(0, 0, 0, 170);
	 gradient.addColorStop(0, key);
	 gradient.addColorStop(1, colors[key]);
	 backgroundColors.push(gradient);
 })

const data = {
  labels: [
		'Разочарован',
		'Уовлетворительно',
		'Хорошо',
		'Великолепно'	
  ],
  datasets: [{
    label: '',
    data: [0, 65, 65, 130],
    backgroundColor: backgroundColors,
    borderWidth: 3,
		cutout: '89%',
  }]
};
const chart = new Chart(ctx, {
	type: 'doughnut',
	data: data,
	options:{
		responsive: false,
		maintainAspectRatio: false,
		elements:{
			// center:{
			// 	text: 'jkhk;h;h'
			// },
		},
		layout:{
			padding:{
				right: 30,
			}
		},
		plugins:{
			legend:{
				position: 'right',
				align: 'end',
				reverse: true,
				labels:{
					usePointStyle: true,
					pointStyle:'circle',
					// padding: '3rem'
				}
			}
			
		},
		
	}
})


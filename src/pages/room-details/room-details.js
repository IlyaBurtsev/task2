import './room-details.scss';
import '@theme/theme_custom.scss'
import '../../components/room-card/room-card';
import '../../page-templates/page-template/page-template';
import '../../components/list/list'

import Chart from 'chart.js/auto';

import { getElement } from '../../utils/utils';
import { initRoomInfo } from '../../components/room-info/room-info';
import { initRoomCards } from '../../components/room-card/room-card';
import { initReviews } from '../../components/review/review';
import { getRoomRepository } from '../../repository/roomRepository/RoomRepository';

import { getServiceRepository } from '../../repository/serviceRepository/serviceRepository';
import { getUserRepository } from '../../repository/userRepository/UserRepository';





const setChart = (chartData=[]) => {
  const ctx = getElement('.room-details__chart').getContext('2d');

  const amazing = ctx.createLinearGradient(0, 0, 0, 170);
  amazing.addColorStop(0, ' #FFE39C');
  amazing.addColorStop(1, '#FFBA9C');

  const good = ctx.createLinearGradient(0, 0, 0, 170);
  good.addColorStop(0, ' #FFE39C');
  good.addColorStop(1, '#FFBA9C');

  const satisfactorily = ctx.createLinearGradient(0, 0, 0, 170);
  satisfactorily.addColorStop(0, ' #FFE39C');
  satisfactorily.addColorStop(1, '#FFBA9C');

  const colors = {
    '#919191': ' #3D4975',
    '#BC9CFF': '#8BA4F9',
    '#6FCF97': '#66D2EA',
    '#FFE39C': '#FFBA9C',
  };

  const backgroundColors = [];
  Object.keys(colors).forEach((key) => {
    let gradient = ctx.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0, key);
    gradient.addColorStop(1, colors[key]);
    backgroundColors.push(gradient);
  });

	const total = () => {
		let counter = 0;
		chartData.forEach(count => counter +=count);
		return counter;
	}

  const title = {
    beforeDraw(chart) {
      const {
        ctx,
        chartArea: { top, width, height },
      } = chart;
      ctx.save();
      ctx.font = 'bold 24px Montserrat';
      ctx.textAlign = 'center';
      ctx.fillStyle = backgroundColors[1];
      ctx.fillText(`${total()}`, width / 2, top - 2 + height / 2);
      ctx.save();
      ctx.font = 'bold 15px Montserrat';
      ctx.textAlign = 'center';
      ctx.fillText('голосов', width / 2, top + 17 + height / 2);
    },
  };

  const data = {
    labels: ['Разочарован', 'Уовлетворительно', 'Хорошо', 'Великолепно'],
    datasets: [
      {
        label: '',
        data: chartData,
        backgroundColor: backgroundColors,
        borderWidth: 3,
        cutout: '89%',
      },
    ],
  };

  return new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      // responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
    plugins: [title],
  });
}
const initRoomDetails = () => {
	const room = getRoomRepository().getRoomByNumber(888);

	setChart([0, 65, 65, 130]);
	initRoomInfo(room);
	initRoomCards(room, getServiceRepository().getServiceInfo());
	initReviews(room.getReviews(), getUserRepository());
}

initRoomDetails();


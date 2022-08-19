import { getElement } from '../../utils/utils';
import './chart.scss';
import '../../components/list/list';
import { setListBullet } from '../../components/list/_bullet/list_bullet';

import Chart from 'chart.js/auto';

const initChart = (bindElement, vote = {}) => {
  const className = {
    chart: 'js-chart__chart',
  };
  const element = getElement(`.${className.chart}`, bindElement);
  setListBullet(Object.keys(vote).reverse(), element.nextElementSibling);
  const ctx = element.getContext('2d');

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
    Object.values(vote).forEach((count) => (counter += count));
    return counter;
  };

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
    datasets: [
      {
        label: '',
        data: Object.values(vote),
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
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
    plugins: [title],
  });
};

export default initChart;

import './pagination.scss';
import 'paginationjs/dist/pagination.css';
require ('paginationjs');

$('.pagination__container').pagination({
	dataSource: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15],
	pageRange: 1,
	pageSize: 1,
	autoHidePrevious: true,
	autoHideNext: true,
	className: 'pagination__container',
	nextText: '<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0.426758L17.0156 8.44238L9 16.458L7.59375 15.0518L13.1719 9.42676H0.984375V7.45801H13.1719L7.59375 1.83301L9 0.426758Z" fill="white"/></svg>',
	prevText: '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="white"/></svg>'
})
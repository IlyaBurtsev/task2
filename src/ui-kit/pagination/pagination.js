import './pagination.scss';
import 'paginationjs/dist/pagination.css';
require ('paginationjs');

$('.pagination__container').pagination({
	dataSource: [1, 2, 3, 4, 5, 6, 7],
	// callback: function(data, pagination) {
	// 	 // template method of yourself
	// 	 var html = template(data);
	// 	 $('.pagination__data-container').html(html);
	// }
})
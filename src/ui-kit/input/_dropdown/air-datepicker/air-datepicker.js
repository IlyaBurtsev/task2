export function clearBackgroundForRangeFrom(){
	if(dp.selectedDates.length ===1){
		const $select = getElement('.-range-from-', dp.$datepicker);
		if(!$select.nextElementSibling.classList.contains('-in-range-') && !$select.nextElementSibling.classList.contains('-range-to-') ){
			$select.classList.add('-range-to-');
		}
	}
}
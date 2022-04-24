import { getElement } from "../../../../utils/utils";


export function clearBackgroundForRangeFrom(){
	getElement('.-range-from-').classList.add('-range-to-');
}

import { getElement } from '../../../../utils/utils';

export function clearBackgroundForRangeFrom() {
  const cell = getElement('.-range-from-');
  if (cell !== null) {
    cell.classList.add('-range-to-');
  }
}

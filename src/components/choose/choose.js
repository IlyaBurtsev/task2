import './choose.scss';
import '../dropdown/dropdown';
import { initDropdowns } from '../dropdown/dropdown';
import { getElement } from '../../utils/utils';

const quantityDropdowns = [];
initDropdowns(getElement('.choose__container'), quantityDropdowns);

quantityDropdowns[0].updateDropdownOptions({
  startValues: 0,
});

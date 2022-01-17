/**
 * Finds DOM element
 * @param {HTMLElement, String} el
 * @param {Document|HTMLElement} [context=document]
 */

 export function getElement(el, context = document) {
	  return typeof el === 'string'
			? context['querySelector'](el)
			: el;
 }

/**
 * Deep merge of objects or arrays, used to merge options
 * @param {object|array} target - target object or array
 * @param {object|array} objects - source objects
 * @return {object|array}
 */
 export function deepMerge(target, ...objects) {
	objects.filter(o => o).forEach((obj) => {
		 for (let [key, value] of Object.entries(obj)) {
			  let arrayOrObject = value !== undefined ? value.toString() === ('[object Object]' || '[object Array]') : false;

			  if (arrayOrObject) {
					let targetType = target[key] !== undefined ? target[key].toString() : undefined,
						 sourceType = value.toString(),
						 initialValue = Array.isArray(value) ? [] : {};

					// If target and source types are different, e.g. we try to merge number with object,
					// then take source type
					target[key] = target[key]
						 ? targetType !== sourceType
							  ? initialValue
							  : target[key]
						 : initialValue;

					deepMerge(target[key], value);
			  } else {
					target[key] = value;
			  }
		 }
	});

	return target;
}

/**
 * Finds closest DOM element to passed target. Similar to jQuery.closest()
 * @param {HTMLElement} target
 * @param {String} selector
 * @return {HTMLElement|Boolean}
 */
 export function closest(target, selector) {
	if (!target || target === document ||  target instanceof DocumentFragment) return false;

	if (target.matches(selector)) {
		 return target;
	}

	return closest(target.parentNode, selector);
}
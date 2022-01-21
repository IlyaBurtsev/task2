

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

/**
 * Creates HTML DOM element
 * @param {String} [tagName] - element's tag name
 * @param {String} [className]
 * @param {String} [innerHtml]
 * @param {String} [id]
 * @param {Object} [attrs]
 * @returns {HTMLElement}
 */
 export function createElement({tagName = 'div', className = '', innerHtml = '', id = '', attrs = {}} = {}) {
	let $element = document.createElement(tagName);
	if (className) $element.classList.add(...className.split(' '));
	if (id) $element.id = id;

	if (innerHtml) {
		 $element.innerHTML = innerHtml;
	}

	if (attrs) {
		 for (let attr in attrs) {
			  $element.setAttribute(attr, attrs[attr]);
		 }
	}

	return $element;
}


/**
 * Class names handler, inspired by https://github.com/JedWatson/classnames but very simplified
 * @param {String|Object} classes - class names, could contain strings or object
 */
 export function classNames(...classes) {
	let classNames = [];

	classes.forEach((c) => {
		 if (typeof c === 'object') {
			  for (let cName in c) {
					if (c[cName]) {
						 classNames.push(cName);
					}
			  }
		 } else if (c) {
			  classNames.push(c);
		 }
	});
	return classNames.join(' ');
}

export function toggleClass(el, classes) {
	for (let className in classes) {
		 if (classes[className]) {
			  el.classList.add(className);
		 } else {
			  el.classList.remove(className);
		 }
	}
}

export function addClass(el, ...classes) {
	if (el.length) {
		 el.forEach((node) => {
			  node.classList.add(...classes);
		 });
	} else {
		 el.classList.add(...classes);
	}
}

export function removeClass(el, ...classes) {
	if (el.length) {
		 el.forEach((node) => {
			  node.classList.remove(...classes);
		 });
	} else {
		 el.classList.remove(...classes);
	}
}


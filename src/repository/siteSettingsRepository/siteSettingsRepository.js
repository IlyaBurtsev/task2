
export function getcheckboxList () {
let items = {};
let request = new XMLHttpRequest();
request.open('GET', 'checkbox-list.json');

request.onreadystatechange = function (aEvt) {
	if (request.readyState == 4) {
		 items = JSON.parse(request.responseText);
	}
 };
 request.send(null); 
 
}
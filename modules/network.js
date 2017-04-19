let server = 'anglish-server.herokuapp.com';
let wordAPI = '/api/words';

var NetworkUtils = {
	fetchWord : function(word){
		return fetch(`http://${server}${wordAPI}?word=${word}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		})
		.then((response) => response.json());
	}
}

export {NetworkUtils as default};
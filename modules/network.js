let server = 'anglish-server.herokuapp.com';
let wordAPI = '/api/words';
let UserLoginAPI = '/users/login';

var NetworkUtils = {
	fetchWord : function(word){
		return fetch(`http://${server}${wordAPI}?word=${word}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		})
		.then((response) => response.json());
	},
	login : function(email, password){
		var credentials = JSON.stringify({
				'email': email,
				'password':password
			});
		console.log(credentials);
		console.log(`http://${server}${UserLoginAPI}`);
		return fetch(`http://${server}${UserLoginAPI}`,{
			method: 'POST',
			headers: {
				'Accept':'application/json'
			},
			body : credentials
		})
		.then((response) => response.json());
	}
}

export {NetworkUtils as default};
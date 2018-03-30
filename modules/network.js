let server = 'anglish-server.herokuapp.com';
let wordAPI = '/api/words';
let UserLoginAPI = '/users/login';
let UserGetAPI = '/users/user';

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
	login : function(emailval, passwordval){
		let credentials = JSON.stringify({
				email: emailval,
				password: passwordval
			});
		return fetch(`http://${server}${UserLoginAPI}`,{
			method: 'POST',
			headers: {
				'Accept':'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: emailval,
				password: passwordval
			})
		})
		.then((response) => {
			return response.json()
		});
	},
	getuser : function(email){
		return fetch(`http://${server}${UserGetAPI}?user=${email}`,{
			method: 'GET',
			headers: {
				'Accept':'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then((response) => response.json());
	}
}

export {NetworkUtils as default};
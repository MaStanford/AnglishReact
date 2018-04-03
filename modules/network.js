let server = 'anglish-server.herokuapp.com';
let wordAPI = '/api/words';
let UserLoginAPI = '/users/login';
let UserRegisterAPI = '/users/register';
let UserGetAPI = '/users/user';

var NetworkUtils = {
	fetchWord: function (word) {
		return fetch(`https://${server}${wordAPI}?word=${word}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		}).then((response) => response.json());
	},
	login: function (emailval, passwordval) {
		return fetch(`https://${server}${UserLoginAPI}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: emailval,
				password: passwordval
			})
		}).then((response) => {
				return response.json()
			});
	},
	register: function (handleval, emailval, passwordval) {
		return fetch(`https://${server}${UserRegisterAPI}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				handle: handleval,
				email: emailval,
				password: passwordval
			})
		}).then((response) => {
			return response.json()
		});
	},
	getuser: function (email) {
		return fetch(`https://${server}${UserGetAPI}?user=${email}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	}
}

export { NetworkUtils as default };
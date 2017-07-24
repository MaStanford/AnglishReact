//Redux
import {createStore, combineReducers} from 'redux';

//Actions
export const actions = {
	SESSION : 0,
	USER :1,
	LOGGED_OUT: 2,
	NEW_WORD : 3
}

//Default state.
var state = {
	user:{
		email:'Guest',
		permissions: 0
	},
	session:{
		user:'',
		token:''
	},
	word: {}
}

const user = (user = state.user, action) => {
	switch(action.type){
		case actions.USER:
			user = action.user;
			return user;
			break;
		case actions.LOGGED_OUT:
			user = {};
			return user;
			break;
		default:
			return user;
	}
};

const session = (session = state.session, action) => {
	switch(action.type){
		case actions.SESSION:
			session = action.session;
			return session;
			break;
		case actions.LOGGED_OUT:
			session = {};
			return session;
			break;
		default:
			return session;
	}
};

const word = (word = state.word, action) => {
	switch(action.type){
		case actions.NEW_WORD:
			word = action.word;
			return word;
			break;
		default:
			return word;
	}
};

const combinedReducers = combineReducers({
	user: user,
	word: word,
	session: session
});

export const store = createStore(combinedReducers);
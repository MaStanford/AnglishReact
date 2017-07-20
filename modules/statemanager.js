//Redux
import {createStore, combineReducers} from 'redux';

//Actions
export const actions = {
	LOGGED_IN : 0,
	LOGGED_OUT :1,
	NEW_WORD : 2
}

//Default state.
var state = {
	user:{
		email:'Guest',
		permissions: 0
	},
	word: {}
}

const user = (user = state.user, action) => {
	switch(action.type){
		case actions.LOGGED_IN:
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
	word: word
});

export const store = createStore(combinedReducers);
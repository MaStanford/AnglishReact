//Redux
import {createStore, combineReducers} from 'redux';

//Actions
export const actions = {
	//Session Actions
	SESSION_NEW : 				0, //New Session
	SESSION_EXPIRED: 			1, //Session expired
	
	//User Actions
	USER_NEW:					2,
	USER_LOGGED_IN: 			3,
	USER_LOGGED_OUT: 			4,
	USER_UPDATED:				5,

	//Modal Actions
	MODAL_SHOW_NEW_WORD:		6,
	MODAL_CLOSE_NEW_WORD:		7,
	MODAL_SHOW_NEW_COMMENT: 	8,
	MODAL_CLOSE_NEW_COMMENT:	9,
	MODAL_SHOW_DETAIL_VIEW: 	10,
	MODAL_CLOSE_DETAIL_VIEW:	11,
	MODAL_SHOW_USER_WORDS:		12,
	MODAL_CLOSE_USER_WORDS: 	13,
	MODAL_SHOW_USER_COMMENTS:	14,
	MODAL_CLOSE_USER_COMMENTS:	15,

	//Network actions
	NETWORK_FETCH_WORD_WORD:	16,
	NETWORK_RECEIVE_WORD_WORD:	17,
	//Continue on in this fashion.
}

//Default state.
var state = {
	user:{
		_id: 'guest',
		handle:'Guest',
		email:'Guest',
		permissions: -1
	},
	session:{
		token:''
	},
	modal:{
		showNewWord: false,
		showNewComment: false,
		showDetailView:false,
		showUserWords:false,
		showUserComments:false
	}
}

const user = (user = state.user, action) => {
	switch(action.type){
		case actions.USER_LOGGED_IN:
			return {...user, ...action.user};
			break;
		case actions.USER_LOGGED_OUT:
		return {...user, ...state.user};
			break;
		default:
			return user;
	}
};

const session = (session = state.session, action) => {
	switch(action.type){
		case actions.SESSION_NEW:
		return {...session, token:action.token};
			break;
		case actions.SESSION_EXPIRED:
		return {...session, ...state.session};
			break;
		default:
			return session;
	}
};

const modal = (modal = state.modal, action) => {
	switch(action.type){
		case actions.MODAL_SHOW_NEW_WORD:
			return {...modal, showNewWord:true}; //... syntax is object spread operator, same as Object.assign https://redux.js.org/recipes/using-object-spread-operator
			break;
		case actions.MODAL_CLOSE_NEW_WORD:
			return {...modal, showNewWord:false};
			break;
		default:
			return modal;
	}
};

const combinedReducers = combineReducers({
	user: user,
	modal: modal,
	session: session
});

export const store = createStore(combinedReducers);
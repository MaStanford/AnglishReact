import {AsyncStorage} from 'react-native';

//Keys
export const keys = {
	user : 'user',
	session : 'session'
}

export const storage = {
	store : function(key, value){
		return AsyncStorage.setItem(key, value);
	},
	fetch : function(key){
		return AsyncStorage.getItem(key);
	},
	clear : function(key){
		return AsyncStorage.removeItem(key);
	}
}
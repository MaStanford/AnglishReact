import {AsyncStorage} from 'react-native';

//Keys
export const keys = {
	user : 'user',
	session : 'session'
}

export const storage = {
	store : function(key, value){
		AsyncStorage.multiSet
		return AsyncStorage.setItem(key, value);
	},
	fetch : function(key, callback){
		return AsyncStorage.getItem(key, callback);
	},
	clear : function(key){
		return AsyncStorage.removeItem(key);
	}
}
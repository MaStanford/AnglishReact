import React, { Component } from 'react';
import {
	Settings,
	StyleSheet
} from 'react-native'

//FAB
import ActionButton from 'react-native-action-button';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';

//styles
import styles from './styles';

//State
import {store} from './statemanager'; 

function getAddButton(callback){
	return (
		<ActionButton.Item key="Add" buttonColor='#9b59b6' title="Add" onPress={() => {callback('Add')}}>
			<Icon name="md-create" style={styles.actionButtonIcon} />
		</ActionButton.Item>
	);
}

function getLoginButton(callback){
	return (
		<ActionButton.Item key="Login" buttonColor='#3498db' title="Login" onPress={() => {callback('Login')}}>
			<Icon name="md-log-in" style={styles.actionButtonIcon} />
		</ActionButton.Item>
	);
}

function getLogoutButton(callback){
	return (
		<ActionButton.Item key="Logout" buttonColor='#3498db' title="Logout" onPress={() => {callback('Login')}}>
			<Icon name="md-log-out" style={styles.actionButtonIcon} />
		</ActionButton.Item>
	);
}

var MenuBuilder = {
	build : function (callback) {
		let menu = [];
		if(store.getState().user.permissions > 2){
			menu.push(getAddButton(callback));
		}
		
		if(store.getState().user.permissions > 0){
			menu.push(getLogoutButton(callback));
		}

		if(store.getState().user.permissions === 0){
			menu.push(getLoginButton(callback));
		}

		return (
		<ActionButton buttonColor="rgba(231,76,60,1)">
			{menu}
		</ActionButton>);
	}
}

export {MenuBuilder as default};
import React, { Component } from 'react';

import {
	AppRegistry,
} from 'react-native';

//FAB
import ActionButton from 'react-native-action-button';

//Icons https://material.io/icons/
import { Icon } from 'react-native-elements'

//styles
import styles from '../modules/styles';

//State
import { store } from '../modules/statemanager';
import utils from '../modules/utils';

var MenuActions = {
	Add:'Add Word',
	Admin:'Admin',
	Login:'Login',
	Logout:'Logout',
	Mod:'Mod',
	Register:'Register',
	Info:'Info'
}

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: store.getState().user
		};

		store.subscribe(() => {
			console.log('Menu Updated! --------');
			this.setState({
				user: store.getState().user
			});
		});
	}

	getAddButton(callback) {
		return (
			<ActionButton.Item key="Add" buttonColor='#9b59b6' title={MenuActions.Add} onPress={() => { callback(MenuActions.Add) }}>
				<Icon name="note-add" style={styles.buttonActionIcon} />
			</ActionButton.Item>
		);
	}

	getAdminButton(callback) {
		return (
			<ActionButton.Item key="Add" buttonColor='red' title={MenuActions.Admin} onPress={() => { callback(MenuActions.Admin) }}>
				<Icon name="supervisor-account" style={styles.buttonActionIcon} />
			</ActionButton.Item>
		);
	}

	getLoginButton(callback) {
		return (
			<ActionButton.Item key="Login" buttonColor='#3498db' title={MenuActions.Login} onPress={() => { callback(MenuActions.Login) }}>
				<Icon name="account-circle" style={styles.buttonActionIcon} />
			</ActionButton.Item>
		);
	}

	getLogoutButton(callback) {
		return (
			<ActionButton.Item key="Logout" buttonColor='#3498db' title={MenuActions.Logout} onPress={() => { callback(MenuActions.Logout) }}>
				<Icon name="exit-to-app" style={styles.buttonActionIcon} />
			</ActionButton.Item>
		);
	}

	getUserButton(callback){
		return (
			<ActionButton.Item key="Info" buttonColor='#3498db' title={MenuActions.Info} onPress={() => { callback(MenuActions.Info) }}>
				<Icon name="info" style={styles.buttonActionIcon} />
			</ActionButton.Item>
		);
	}

	getRegisterButton(callback) {
		return (
			<ActionButton.Item key="Register" buttonColor='#3498db' title={MenuActions.Register} onPress={() => { callback(MenuActions.Register) }}>
				<Icon name="assignment" style={styles.buttonActionIcon} />
			</ActionButton.Item>
		);
	}

	build(user, callback) {
		let menu = [];
		switch(user.permissions){
			case utils.permissions.owner:
				menu.push(this.getAdminButton(callback));
			case utils.permissions.admin:
			case utils.permissions.mod:
			case utils.permissions.poweruser:	
				menu.push(this.getAddButton(callback));
			case utils.permissions.basicuser:
			case utils.permissions.punisheduser: 
					menu.push(this.getLogoutButton(callback));
					menu.push(this.getUserButton(callback));
					break;
			case 0:
			case -1:
				menu.push(this.getLoginButton(callback));
				menu.push(this.getRegisterButton(callback));
		}
		return menu;
	}

	render() {
		let menu = this.build(this.state.user, this.props.callback);
		return (
			<ActionButton buttonColor="rgba(231,76,60,1)">
				{menu}
			</ActionButton>
		);
	}
}
export { MenuActions as MenuActions };

AppRegistry.registerComponent('Menu', () => Menu);

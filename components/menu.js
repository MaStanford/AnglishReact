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

var MenuActions = {
	Add:'Add Word',
	Admin:'Admin',
	Login:'Login',
	Logout:'Logout',
	Register:'Register'
}

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: store.getState().user
		};

		store.subscribe(() => {
			console.log('\nMenu Updated! --------\n');
			this.setState({
				user: store.getState().user
			});
		});
	}

	getAddButton(callback) {
		return (
			<ActionButton.Item key="Add" buttonColor='#9b59b6' title={MenuActions.Add} onPress={() => { callback(MenuActions.Add) }}>
				<Icon name="note-add" style={styles.actionButtonIcon} />
			</ActionButton.Item>
		);
	}

	getAdminButton(callback) {
		return (
			<ActionButton.Item key="Add" buttonColor='red' title={MenuActions.Admin} onPress={() => { callback(MenuActions.Admin) }}>
				<Icon name="supervisor-account" style={styles.actionButtonIcon} />
			</ActionButton.Item>
		);
	}

	getLoginButton(callback) {
		return (
			<ActionButton.Item key="Login" buttonColor='#3498db' title={MenuActions.Login} onPress={() => { callback(MenuActions.Login) }}>
				<Icon name="account-circle" style={styles.actionButtonIcon} />
			</ActionButton.Item>
		);
	}

	getLogoutButton(callback) {
		return (
			<ActionButton.Item key="Logout" buttonColor='#3498db' title={MenuActions.Logout} onPress={() => { callback(MenuActions.Logout) }}>
				<Icon name="input" style={styles.actionButtonIcon} />
			</ActionButton.Item>
		);
	}

	getRegisterButton(callback) {
		return (
			<ActionButton.Item key="Register" buttonColor='#3498db' title={MenuActions.Register} onPress={() => { callback(MenuActions.Register) }}>
				<Icon name="assignment" style={styles.actionButtonIcon} />
			</ActionButton.Item>
		);
	}

	build(user, callback) {
		let menu = [];
		switch(user.permissions){
			case 99:menu.push(this.getAdminButton(callback));
			case 5:
			case 4:
			case 3:
			case 2:	menu.push(this.getAddButton(callback));
			case 1:
			case 0: menu.push(this.getLogoutButton(callback));
					break;
			case -1:(menu.push(this.getLoginButton(callback)), menu.push(this.getRegisterButton(callback)));
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

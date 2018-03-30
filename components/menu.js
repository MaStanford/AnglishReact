import React, { Component } from 'react';

import {
	AppRegistry,
} from 'react-native';

//FAB
import ActionButton from 'react-native-action-button';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';

//styles
import styles from '../modules/styles';

//State
import { store } from '../modules/statemanager';

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: store.getState().user
		};

		store.subscribe(() => {
			console.log('\nMenu Updated! --------\n');
			console.log(store.getState());
			this.setState({
				user: store.getState().user
			});
		});
	}

	getAddButton(callback) {
		return (
			<ActionButton.Item key="Add" buttonColor='#9b59b6' title="Add" onPress={() => { callback('Add') }}>
				<Icon name="md-create" style={styles.actionButtonIcon} />
			</ActionButton.Item>
		);
	}

	getLoginButton(callback) {
		return (
			<ActionButton.Item key="Login" buttonColor='#3498db' title="Login" onPress={() => { callback('Login') }}>
				<Icon name="md-log-in" style={styles.actionButtonIcon} />
			</ActionButton.Item>
		);
	}

	getLogoutButton(callback) {
		return (
			<ActionButton.Item key="Logout" buttonColor='#3498db' title="Logout" onPress={() => { callback('Logout') }}>
				<Icon name="md-log-out" style={styles.actionButtonIcon} />
			</ActionButton.Item>
		);
	}

	getRegisterButton(callback) {
		return (
			<ActionButton.Item key="Register" buttonColor='#3498db' title="Register" onPress={() => { callback('Register') }}>
				<Icon name="md-person-add" style={styles.actionButtonIcon} />
			</ActionButton.Item>
		);
	}

	build(user, callback) {
		let menu = [];
		switch(user.permissions){
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

AppRegistry.registerComponent('Menu', () => Menu);

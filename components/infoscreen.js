//React imports
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TextInput,
	Button
} from 'react-native';
import {
	StackNavigator,
} from 'react-navigation';
import ActionButton from 'react-native-action-button';

import styles from '../modules/styles';
import Titlebar from './titlebar';
import UserComponent from './usercomponent';
import Network from '../modules/network';
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';

export default class InfoScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: '',
			info: '',
			user: store.getState().user
		};

		store.subscribe(() => {
			this.setState({
				user: store.getState().user
			});
		});
	}

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title
	});

	_getUser(email) {
		return Network
			.getUserByEmail(email)
			.then((res) => {
				if (res.code == 1) {
					this.setState({ user: res.data });
					return res.data;
				} else {
					throw new Error('User not found');
				}
			})
	}

	render() {
		var error = this.state.error == '' ? null : this._getErrorText();
		var info = this.state.info == '' ? null : this._getInfoText();
		return (
			<View style={styles.containermain}>
				<Titlebar title="User Info" />
				{error}
				{info}
				<View style={{borderWidth: 1}}>
					<UserComponent user={this.state.user} onPressItem={()=>{}} />
				</View>
				<Text>App info</Text>
				<Text>Privacy Policy</Text>
				<Text>Change Password</Text>
				<Text>Word List</Text>
				<Text>Comment List</Text>
			</View>
		);
	}
}

AppRegistry.registerComponent('User', () => UserScreen);
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

export default class UserScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: '',
			info: '',
			user: this.props.navigation.state.params.user
		};
	}

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title
	});

	_getUser(email) {
		return Network
			.getuser(email)
			.then((res) => {
				if (res.code == 1) {
					this.setState({user: res.data});
					return res.data;
				} else {
					throw new Error('User not found');
				}
			})
	}

	render() {
		return (
			<View style={styles.containermain}>
				<Titlebar title="User Info" />
				<Text ref='error' style={styles.texterror}>
					{this.state.error}
				</Text>
				<Text ref='info' style={styles.textInfo}>
					{this.state.info}
				</Text>
				<UserComponent user={this.state.user}/>
			</View>
		);
	}
}

AppRegistry.registerComponent('User', () => UserScreen);
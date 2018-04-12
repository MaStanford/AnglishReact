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
import Network from '../modules/network';
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';

export default class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			handle: '',
			email: '',
			password: '',
			error: ''
		};
	}

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title
	});

	onPressButton() {
		this.setState({
			handle: this.state.handle,
			email: this.state.email,
			password: this.state.password
		});

		this.register(this.state.handle, this.state.email, this.state.password);
	}

	register(handle, email, password) {
		Network.register(handle, email, password)
			.then((res) => {
				if (res.code == 1) {
					return res.data;
				} else {
					throw new Error('Handle or email already registered');
				}
			}).then((result) => {
				storage.store(keys.user, JSON.stringify(result)).then(() => { 
					//Hurray
				}).catch((error) => {
					throw new Error('Store User failed');
				});
				store.dispatch({
					type: actions.USER,
					user: result
				});
				return result;
			}).then((result) => {
				return Network.login(email, password);
			}).then((res) => {
				if (res.code == 1) {
					storage.store(keys.session, JSON.stringify(res.data)).then(() => {
						//Hurray
					}).catch((error) => {
						throw new Error('Store Session failed');
					});
					store.dispatch({
						type: actions.SESSION,
						session: res.data
					});
					return res.data;
				} else {
					throw new Error('Login after registration failed');
				}
			}).then(function() { 
				const { goBack } = this.props.navigation;
				goBack();
			}.bind(this)).catch((err) => {
				this.setState({error: err.message});
			});
	}

	render() {
		return (
			<View style={styles.containermain}>
				<Titlebar title="Register New Account" />
				<Text ref='error' style={styles.texterror}>
					{this.state.error}
				</Text>
				<TextInput
					returnKeyType='next'
					style={styles.textinput}
					placeholder="Handle"
					onChangeText={(text) => this.state.handle = text}
					onSubmitEditing={(event) => {
							this.refs.SecondInput.focus();
						}
					}
				/>
				<TextInput
					ref='SecondInput'
					returnKeyType='next'
					style={styles.textinput}
					placeholder="Email"
					onChangeText={(text) => this.state.email = text.toLowerCase()}
					onSubmitEditing={(event) => {
							this.refs.ThirdInput.focus();
						}
					}
				/>
				<TextInput
					ref='ThirdInput'
					style={styles.textinputpassword}
					placeholder="Password"
					onChangeText={(text) => this.state.password = text}
					onSubmitEditing={this.onPressButton.bind(this)}
					secureTextEntry={true}
					returnKeyType='go'
				/>
				<TouchableHighlight
					style={styles.buttonTranslate}
					underlayColor="black"
					onPress={this.onPressButton.bind(this)}>
					<Text style={styles.textTranslate}>
						Register
          			</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

AppRegistry.registerComponent('Register', () => Register);
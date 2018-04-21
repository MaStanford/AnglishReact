import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, TouchableHighlight } from 'react-native';

import styles from '../modules/styles';
import utils from '../modules/utils';
import Network from '../modules/network';
import { store } from '../modules/statemanager';

export default class ChangePasswordComponent extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			error: '',
			info: '',
			user: props.user,
			password1: '',
			password2: ''
		}
	}

	_onPressButton() {
		console.log(user);
		console.log(this.state);
		console.log(store.getState().session.token);
		if (this.state.password1 === '') {
			this.setState({error: 'Password cannot be empty'});
		} else {
			if (this.state.password1 === this.state.password2) {
				Network.updateUserPassword(this.state.user, this.state.password1, store.getState().session.token)
				.then((res)=>{
					if(res.code == 1){
						this.setState({info: 'Password sucessfully changed!'});
						this.setState({error: ''});
					}else{
						this.setState({error: 'Error: ' + res.result});
						this.setState({info: ''});
					}
				})
				.catch((err)=>{
					this.setState({error: err.message});
					this.setState({info: ''});
				});
			} else {
				this.setState({error: 'Passwords do not match.'});
				this.setState({info: ''});
			}
		}
	}

	_getInfoText() {
		return (
			<View style={{ flexDirection: 'column', alignContent: 'center' }}>
				<Text ref='info' style={styles.textInfo}>
					{this.state.info}
				</Text>
			</View>
		);
	}

	_getErrorText() {
		return (
			<View style={{ flexDirection: 'column', alignContent: 'center' }}>
				<Text ref='error' style={styles.texterror}>
					{this.state.error}
				</Text>
			</View>
		);
	}

	render() {
		var error = this.state.error == '' ? null : this._getErrorText();
		var info = this.state.info == '' ? null : this._getInfoText();
		return (
			<View>
				
				<Text style={styles.textappinfoheader}>Change Password</Text>
				{error}
				{info}
				<TextInput
					style={styles.textinputpasswordchange}
					placeholder="New Password"
					onChangeText={(text) => this.state.password1 = text}
					onSubmitEditing={(event) => {
						this.refs.second.focus();
					}
					}
					secureTextEntry={true}
					returnKeyType='go'
				/>
				<TextInput
					ref='second'
					style={styles.textinputpasswordchange}
					placeholder="Confirm Password"
					onChangeText={(text) => this.state.password2 = text}
					onSubmitEditing={(event) => { this._onPressButton() }}
					secureTextEntry={true}
					returnKeyType='go'
				/>
				<TouchableHighlight
					style={styles.buttonChangePassword}
					underlayColor="black"
					onPress={() => this._onPressButton()}>
					<Text style={styles.textTranslate}>
						Update Password
          			</Text>
				</TouchableHighlight>
			</View>
		);
	}
}
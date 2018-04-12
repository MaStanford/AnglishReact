//React imports
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TextInput,
	Button,
	Picker
} from 'react-native';
import {
	StackNavigator,
} from 'react-navigation';
import ActionButton from 'react-native-action-button';

import styles from '../modules/styles';
import Titlebar from './titlebar';
import Network from '../modules/network';
import UserList from './userlist';
import UpdateUserModal from './updateusermodal';
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';

export default class AdminScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: '',
			info: '',
			userLookupSearch: '',
			userFound: { handle: '', email: '', permissions: '' },
			pickerVisible: false
		};
	}

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title
	});

	_handleUserSelected = (user) => {
		this.setState({ userFound: user, pickerModalVisible: true });
	}

	_updateUserCallback = () => {
		this.setState({pickerModalVisible:false});
	}

	_getPickerModal() {
		return (
			<UpdateUserModal user={this.state.userFound} callback={this._updateUserCallback}/>
		);
	}

	render() {
		var picker = this.state.pickerModalVisible ? this._getPickerModal() : null;
		return (
			<View style={styles.containermain}>
				<Titlebar title="Admin Portal" />
				<Text ref='error' style={styles.texterror}>
					{this.state.error}
				</Text>
				<Text ref='info' style={styles.textInfo}>
					{this.state.info}
				</Text>
				<Text >User Lookup</Text>
				<TextInput
					style={styles.textinput}
					placeholder='User Handle'
					onChangeText={(text) => { this.state.userLookupSearch = text }}
					onSubmitEditing={() => {this.setState({ userLookupSearch: this.state.userLookupSearch })}}
					returnKeyType='go'
				/>
				<TouchableHighlight
					style={styles.buttonModal}
					underlayColor="black"
					onPress={() => {this.setState({ userLookupSearch: this.state.userLookupSearch })}}>
					<Text style={styles.textTranslate}>
						Search
					</Text>
				</TouchableHighlight>
				<UserList callback={(user) => { this._handleUserSelected(user) }} handle={this.state.userLookupSearch} />
				{picker}
			</View>
		);
	}
}

AppRegistry.registerComponent('Admin', () => AdminScreen);
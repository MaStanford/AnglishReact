//React imports
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TextInput,
	Modal
} from 'react-native';

import Picker from 'react-native-picker';

//Icons https://material.io/icons/
import { Icon } from 'react-native-elements'

import styles from '../modules/styles';
import Titlebar from './titlebar';
import UserComponent from './usercomponent';
import Network from '../modules/network';
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';
import utils from '../modules/utils';

export default class UpdateUserModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: '',
			info: '',
			user: props.user,
			permissions: props.user.permissions
		};
	}

	componentDidMount() {
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	setModalVisible() {
		this.props.callback();
	}

	_handlePermissionUpdate = (itemValue, itemIndex) => {
		this.setState({ permissions: itemValue });
	}

	_updateUser = () => {
		Network.updateUserPermissions(this.state.user, this.state.permissions, store.getState().session.token)
			.then((res) => {
				if (res.code == 1) {
					this.setState({ info: 'Successfully updated user' });
					setTimeout(() => { this.setModalVisible() }, 1000);
				} else {
					this.setState({ error: res.result });
				}
			})
			.catch((err) => {
				this.setState({ error: err.message });
			});
	}

	_showPermissionPicker() {
		let data = Object.keys(utils.permissions);
		var selected = utils.getKeyFromValue(utils.permissions, this.state.permissions);
		console.log(selected);
		Picker.init({
			pickerData: data,
			pickerTitleText: 'Select Permission',
			pickerConfirmBtnText: 'Select',
			pickerCancelBtnText	: 'Back',
			selectedValue: [selected],
			pickerToolBarFontSize: 18,
			pickerFontColor: [0, 0 ,0, 1],
			pickerConfirmBtnColor: [0, 0, 0, 1],
			pickerCancelBtnColor: [0, 0, 0, 1],
			pickerBg: [255,255,255,1],
			pickerToolBarBg: [220, 220, 220, 1], //This is the same as the DCDCDC used in the app for button bg
			
			onPickerConfirm: data => {
				this.setState({permissions: utils.permissions[data]});
				this.setState({info: 
					'Change ' + this.state.user.handle 
				+ ' permissions from ' + utils.getKeyFromValue(utils.permissions,this.state.user.permissions) 
				+ ' to ' + data + '?'});
			},
			
			onPickerCancel: data => {
				this.setState({permissions: this.state.permissions});
			},
			
			onPickerSelect: data => {
			}
		});
		Picker.show();
	}

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => {
					this.setModalVisible(false);
				}
				}>
				<View style={styles.containerModalPickerPermissions}>
					<Titlebar title='Update User' />
					<UserComponent user={this.state.user} />
					<View style={{ flexDirection: 'column', alignContent: 'center' }}>
						<Text ref='error' style={styles.texterror}>
							{this.state.error}
						</Text>
						<Text ref='info' style={styles.textInfo}>
							{this.state.info}
						</Text>
					</View>
					<View style={styles.containerUpdateUserModalButtons}>
						<TouchableHighlight
							style={styles.buttonSelectPermissions}
							underlayColor="black"
							onPress={() => { this._showPermissionPicker();}}>
							<Text style={styles.textTranslate}>
								Select new permissions
							</Text>
						</TouchableHighlight>
					</View>
					<View style={{ flexDirection: 'row'}}>
						<TouchableHighlight
							style={styles.buttonModal}
							underlayColor="black"
							onPress={() => { this.setModalVisible() }}>
							<Text style={styles.textTranslate}>
								Back
							</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={styles.buttonModal}
							underlayColor="black"
							onPress={() => { this._updateUser() }}>
							<Text style={styles.textTranslate}>
								Update
							</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
		);
	}
}
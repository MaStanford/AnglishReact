//React imports
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TextInput,
	Modal,
	Picker
} from 'react-native';

//Icons https://material.io/icons/
import { Icon } from 'react-native-elements'

import styles from '../modules/styles';
import Titlebar from './titlebar';
import UserComponent from './usercomponent';
import Network from '../modules/network';
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';

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
					this.setState({ info: 'Successfully updated state' });
					setTimeout(() => { this.setModalVisible() }, 200);
				} else {
					this.setState({ error: res.result });
				}
			})
			.catch((err) => {
				this.setState({ error: err.message });
			});
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
					<Titlebar title='Update Permissions' />
					<UserComponent user={this.state.user} />
					<View style={{ flexDirection: 'column', alignContent: 'center' }}>
						<Text ref='error' style={styles.texterror}>
							{this.state.error}
						</Text>

						<Text ref='info' style={styles.textInfo}>
							{this.state.info}
						</Text>
					</View>
					<View style={styles.containerPickerPermissions}>
						<Picker
							mode='dialog'
							selectedValue={this.state.permissions}
							style={styles.pickerPermissions}
							itemStyle={styles.textPickerPermissions}
							onValueChange={(itemValue, itemIndex) => this._handlePermissionUpdate(itemValue, itemIndex)}>
							<Picker.Item label="99 - Owner" value='99' />
							<Picker.Item label="5  - Admin" value="5" />
							<Picker.Item label="4  - Mod" value="4" />
							<Picker.Item label="3  - Power User" value="3" />
							<Picker.Item label="2  - Basic User" value="2" />
							<Picker.Item label="1  - Punished User" value="1" />
						</Picker>
					</View>
					<View style={{ flexDirection: 'row' }}>
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
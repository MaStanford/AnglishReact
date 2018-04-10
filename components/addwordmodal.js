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
	Modal,
	ScrollView,
	Keyboard
} from 'react-native';

//Icons https://material.io/icons/
import { Icon } from 'react-native-elements'

import styles from '../modules/styles';
import Titlebar from './titlebar';
import EditTextModal from './edittextmodal';
import Network from '../modules/network';
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';

export default class AddWord extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edittextmodalvisible: false,
			editTextModalParentState: 'attested',
			text: '',
			error: '',
			word: '',
			type: '',
			attested: '',
			unattested: ''
		};
	}

	setModalVisible(visible) {
		this.props.callback(visible);
	}

	onPressButton() {
		this.setState({
			word: this.state.word,
			type: this.state.type,
			attested: this.state.attested,
			unattested: this.state.unattested
		});
		Keyboard.dismiss();
	}

	_openLargeEdit(state, currentText) {
		this.setState({
			text: currentText,
			editTextModalParentState: state,
			edittextmodalvisible: true
		});
	}

	_editTextModalCallback(state, inputText) {
		this.setState({
			[state]: inputText,
			edittextmodalvisible: false,
		});
	}

	_getEditTextModal() {
		return (
			<EditTextModal
				visible={this.state.edittextmodalvisible}
				parentState={this.state.editTextModalParentState}
				text={this.state.text}
				callback={this._editTextModalCallback.bind(this)}
			/>);
	}

	render() {
		var editTextModel = this.state.edittextmodalvisible ? this._getEditTextModal() : null;
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => {
					this.setModalVisible(false);
				}
				}>
				<View style={styles.modalBackgroundAddNewWord}>
					<Titlebar title="Add New Word" />
					<Text ref='error' style={styles.texterror}>
						{this.state.error}
					</Text>

					<View style={styles.modalContent}>
						<TextInput
							returnKeyType='next'
							ref='word'
							style={styles.textinputaddtop}
							placeholder="Word"
							onChangeText={(text) => this.setState({ word: text })}
							onSubmitEditing={(event) => {
								this.refs.type.focus();
							}
							} />

						<TextInput
							returnKeyType='next'
							ref='type'
							style={styles.textinputaddtop}
							placeholder="Type"
							onChangeText={(text) => this.setState({ type: text })}
							onSubmitEditing={(event) => {
								this.refs.attested.focus();
							}
							} />

						<View style={{ flexDirection: 'row' }}>
							<TextInput
								returnKeyType='next'
								ref='attested'
								style={styles.textinputaddbot}
								value={this.state.attested}
								placeholder="Attested"
								onChangeText={(text) => this.setState({ attested: text })}
								onSubmitEditing={(event) => {
									this.refs.unattested.focus();
								}
								} />
							<TouchableHighlight
								style={styles.textinputrowaddwordbutton}
								onPress={() => {
									this._openLargeEdit('attested', this.state.attested);
								}}>
								<Icon name="description" style={styles.modalButtonOpenEdit} />
							</TouchableHighlight>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<TextInput
								ref='unattested'
								style={styles.textinputaddbot}
								value={this.state.unattested}
								placeholder="Unattested"
								onChangeText={(text) => this.setState({ unattested: text })}
								onSubmitEditing={this.onPressButton.bind(this)}
								returnKeyType='go'
							/>
							<TouchableHighlight
								style={styles.textinputrowaddwordbutton}
								onPress={() => {
									this._openLargeEdit('unattested', this.state.unattested);
								}}>
								<Icon name="description" style={styles.modalButtonOpenEdit} />
							</TouchableHighlight>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<TouchableHighlight
								style={styles.modalButton}
								onPress={() => {
									this.setModalVisible(false);
								}}>
								<Text style={styles.text_translate}>
									Back
								</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={styles.modalButtonAddComment}
								underlayColor="black"
								onPress={this.onPressButton.bind(this)}>
								<Text style={styles.text_translate}>
									Add Word
          						</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
				{editTextModel}
			</Modal>
		);
	}
}
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
import EditWordTextModal from './wordedittextmodal';
import Network from '../modules/network';
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';

export default class AddWord extends Component {

	constructor(props) {
		super(props);

		word = props.word;
		if(!props.word){
			word = {
				word: '',
				type: '',
				attested: '',
				unattested: ''
			}
		}
		
		this.state = {
			edittextmodalvisible: false,
			editTextModalParentState: 'attested',
			text: '',
			error: '',
			info: '',
			word: word.word,
			type: word.type,
			attested: word.attested,
			unattested: word.unattested
		};

		//Sub to state updates
		store.subscribe(() => {
			//If we somehow are here and the user is logged out. 
			if (store.getState().user.permissions < 2) {
				this.setState({ error: 'Invalid permissions to add word.' });
			}
		});

		//Edge case that somehow this is launched when we don't have permissions
		if (!store.getState().session || store.getState().user.permissions < 2) {
			//this.setModalVisible(visible);
			this.setState({ error: 'Invalid permissions to add word.' });
		}
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
		this._addword();
	}

	_addword() {
		word = {
			word: this.state.word,
			type: this.state.type,
			attested: this.state.attested,
			unattested: this.state.unattested
		}

		if (word.word == '' || word.type == '' || word.attested == '' || word.unattested == '') {
			this.setState({ error: 'Please fill out all fields, use a \'-\' character to fill empty fields.' });
			return;
		}

		if (props.word) {
			word = this.props.word;
			word.word = this.state.word;
			word.type = this.state.type;
			word.attested = this.state.attested;
			word.unattested = this.state.unattested;

			Network.updateWord(word)
				.then((result) => {
					if (result.code == 1) {
						this.setState({ info: result.data.word + ' updated!' });
						this.setState({ error: '' });
						this._clear();
						setTimeout(() => { this.setModalVisible(false) }, 500);
					} else {
						this.setState({ info: '' });
						this.setState({ error: 'Failed to add word!' });
					}
				})
				.catch((err) => {
					this.setState({ error: err.message });
				});
		} else {
			Network.addWord(word, store.getState().session.token)
				.then((result) => {
					if (result.code == 1) {
						this.setState({ info: result.data.word + ' added!' });
						this.setState({ error: '' });
						this._clear();
						setTimeout(() => { this.setModalVisible(false) }, 500);
					} else {
						this.setState({ info: '' });
						this.setState({ error: 'Failed to add word!' });
					}
				})
				.catch((err) => {
					this.setState({ error: err.message });
				});
		}
	}

	_clear() {
		this.setState({
			text: '',
			error: '',
			info: '',
			word: '',
			type: '',
			attested: '',
			unattested: ''
		})
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
			<EditWordTextModal
				visible={this.state.edittextmodalvisible}
				parentState={this.state.editTextModalParentState}
				text={this.state.text}
				callback={this._editTextModalCallback.bind(this)}
			/>);
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
		var editTextModel = this.state.edittextmodalvisible ? this._getEditTextModal() : null;
		var error = this.state.error == '' ? null : this._getErrorText();
		var info = this.state.info == '' ? null : this._getInfoText();
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => {
					this.setModalVisible(false);
				}
				}>
				<View style={styles.containerModalAddNewWordBackground}>
					<Titlebar title="Add New Word" />
					<View style={styles.containerModalContent}>
						<View style={{ flexDirection: 'column', alignContent: 'center' }}>
							{error}
							{info}
						</View>
						<TextInput
							returnKeyType='next'
							ref='word'
							style={styles.textinputaddtop}
							placeholder="Word"
							value={this.state.word}
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
							value={this.state.type}
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
								<Icon name="wrap-text" style={styles.buttonModalOpenEdit} />
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
								<Icon name="wrap-text" style={styles.buttonModalOpenEdit} />
							</TouchableHighlight>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<TouchableHighlight
								style={styles.buttonModal}
								onPress={() => {
									this.setModalVisible(false);
								}}>
								<Text style={styles.textTranslate}>
									Back
								</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={styles.buttonModalAddComment}
								underlayColor="black"
								onPress={this.onPressButton.bind(this)}>
								<Text style={styles.textTranslate}>
									Add Word
          						</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={styles.buttonModal}
								underlayColor="black"
								onPress={this._clear.bind(this)}>
								<Text style={styles.textTranslate}>
									Clear
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
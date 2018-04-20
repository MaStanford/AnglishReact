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
import utils from '../modules/utils';

export default class WordAddModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			visible: props.visible,
			edittextmodalvisible: false,
			editTextModalParentState: 'attested',
			isEdit: props.isEdit,
			text: '',
			error: '',
			info: '',
			word: props.word
		};

		store.subscribe(() => {
			if (store.getState().user.permissions < utils.permissions.poweruser) {
				this.setState({ error: 'Invalid permissions to add word.' });
			}
		});

		if (!store.getState().session || store.getState().user.permissions < 2) {
			this.setState({ error: 'Invalid permissions to add word.' });
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			word: props.word,
			visible: props.visible
		});
	}

	setModalVisible() {
		this.props.callback(this.state.word);
	}

	onPressButton() {
		this.setState({
			word: this.state.word
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

		if (this.props.isEdit) {
			Network.updateWord(word)
				.then((result) => {
					if (result.code == 1) {
						this.setState({ info: result.data.word + ' updated!' });
						this.setState({ error: '' });
						setTimeout(() => { this.setModalVisible() }, 500);
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
						setTimeout(() => { this.setModalVisible() }, 500);
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
			word: {word:'',type:'', attested:'',unattested:''}
		})
	}

	_resetState(){
		console.log('state:');
		console.log(this.state);
		console.log(this.props.word);
		if(this.state.isEdit){
			this.props.callback(this.props.word);
		}else{
			this.props.callback(this.state.word);
		}
	}

	_openLargeEdit(state, currentText) {
		this.setState({
			text: currentText,
			editTextModalParentState: state,
			edittextmodalvisible: true
		});
	}

	_editTextModalCallback(state, inputText) {
		newWord = this.state.word;
		newWord[state] = inputText;
		this.setState({
			word: newWord,
			edittextmodalvisible: false,
		});
	}

	_updateText(state, inputText){
		newWord = this.state.word;
		newWord[state] = inputText;
		this.setState({
			word: newWord
		});
	}

	_getEditTextModal() {
		return (
			<EditWordTextModal
				visible={this.state.edittextmodalvisible}
				parentState={this.state.editTextModalParentState}
				text={this.state.text}
				callback={(state, input) => this._editTextModalCallback(state, input)}
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

		title = this.state.isEdit ? 'Update word: ' + this.props.word.word : "Add New Word";
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.state.visible}
				onRequestClose={() => {
					this.setModalVisible();
				}
				}>
				<View style={styles.containerModalAddNewWordBackground}>
					<Titlebar title={title} />
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
							value={this.state.word.word}
							onChangeText={(text) => this._updateText('word', text)}
							onSubmitEditing={(event) => {
								this.refs.type.focus();
							}
							} />

						<TextInput
							returnKeyType='next'
							ref='type'
							style={styles.textinputaddtop}
							placeholder="Type"
							value={this.state.word.type}
							onChangeText={(text) => this._updateText('type', text)}
							onSubmitEditing={(event) => {
								this.refs.attested.focus();
							}
							} />

						<View style={{ flexDirection: 'row' }}>
							<TextInput
								returnKeyType='next'
								ref='attested'
								style={styles.textinputaddbot}
								value={this.state.word.attested}
								placeholder="Attested"
								onChangeText={(text) => this._updateText('attested', text)}
								onSubmitEditing={(event) => {
									this.refs.unattested.focus();
								}
								} />
							<TouchableHighlight
								style={styles.textinputrowaddwordbutton}
								onPress={() => {
									this._openLargeEdit('attested', this.state.word.attested);
								}}>
								<Icon name="wrap-text" style={styles.buttonModalOpenEdit} />
							</TouchableHighlight>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<TextInput
								ref='unattested'
								style={styles.textinputaddbot}
								value={this.state.word.unattested}
								placeholder="Unattested"
								onChangeText={(text) => this._updateText('unattested', text)}
								onSubmitEditing={this.onPressButton.bind(this)}
								returnKeyType='go'
							/>
							<TouchableHighlight
								style={styles.textinputrowaddwordbutton}
								onPress={() => {
									this._openLargeEdit('unattested', this.state.word.unattested);
								}}>
								<Icon name="wrap-text" style={styles.buttonModalOpenEdit} />
							</TouchableHighlight>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<TouchableHighlight
								style={styles.buttonModal}
								onPress={() => {
									this._resetState();
								}}>
								<Text style={styles.textTranslate}>
									Back
								</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={styles.buttonModalAddComment}
								underlayColor="black"
								onPress={() => { this.onPressButton() }}>
								<Text style={styles.textTranslate}>
									Add Word
          						</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={styles.buttonModal}
								underlayColor="black"
								onPress={() => { this._clear() }}>
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
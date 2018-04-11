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
import EditWordTextModal from './edittextmodal';
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
			info: '',
			word: '',
			type: '',
			attested: '',
			unattested: ''
		};

		//Sub to state updates
		store.subscribe(() => {
			//If we somehow are here and the user is logged out. 
			if(store.getState().user.permissions < 2){
				this.setState({error: 'Invalid permissions to add word.'});
				//this.setModalVisible(visible);
			}
		}).bind(this);

		//Edge case that somehow this is launched when we don't have permissions
		if(!store.getState().session || store.getState().user.permissions < 2){
			//this.setModalVisible(visible);
			this.setState({error: 'Invalid permissions to add word.'});
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

	_addword(){
		word = {
			word: this.state.word,
			type: this.state.type,
			attested: this.state.attested,
			unattested: this.state.unattested
		}

		if(word.word == '' || word.type == '' || word.attested == '' || word.unattested == ''){
			this.setState({error: 'Please fill out all fields, use a \'-\' character to fill empty fields.'});
			return;
		}

		Network.addWord(word, store.getState().session.token)
		.then(function(result){
			if(result.code == 1){
				this.setState({info: result.data.word + ' Added!'});
				this.setState({error:''});
				this._clear();
			}else{
				this.setState({info:''});
				this.setState({error: 'Failed to add word!'});
			}
		}.bind(this))
		.catch(function(err){
			this.setState({error: err.message});
		}.bind(this));
	}

	_clear(){
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

					<View style={{ flexDirection: 'column', alignContent: 'center' }}>
						<Text ref='error' style={styles.texterror}>
							{this.state.error}
						</Text>

						<Text ref='info' style={styles.textInfo}>
							{this.state.info}
						</Text>
					</View>

					<View style={styles.modalContent}>
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
								<Icon name="subject" style={styles.modalButtonOpenEdit} />
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
								<Icon name="subject" style={styles.modalButtonOpenEdit} />
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
							<TouchableHighlight
								style={styles.modalButton}
								underlayColor="black"
								onPress={this._clear.bind(this)}>
								<Text style={styles.text_translate}>
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
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
	ScrollView
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
			edittextmodalparentref: {},
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
		console.log('Add Button pressed');
	}

	_openLargeEdit(ref, currentText) {
		console.log('_openLargeEdit');
		console.log(ref);
		this.setState({
			edittextmodalparentref: ref,
			edittextmodalvisible: true,
			text: currentText
		});
	}

	_editTextModalCallback(ref, inputText) {
		console.log('_editTextModalCallback');
		console.log(ref);
		ref.setNativeProps({ text: inputText });
		this.setState({
			edittextmodalvisible: false
		});
	}

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => { }}>
				<View style={styles.modalBackgroundAddNewWord}>
					<Titlebar title="Add New Word" />
					<Text ref='error' style={styles.texterror}>
						{this.state.error}
					</Text>

					<View style={styles.modalContent}>
						<TextInput
							returnKeyType='next'
							ref={component => this._word = component}
							style={styles.textinputaddtop}
							placeholder="Word"
							onChangeText={(text) => this.state.word = text}
							onSubmitEditing={(event) => {
								this.refs._type.focus();
							}
							} />

						<TextInput
							returnKeyType='next'
							ref={component => this._type = component}
							style={styles.textinputaddtop}
							placeholder="Type"
							onChangeText={(text) => this.state.type = text}
							onSubmitEditing={(event) => {
								this.refs._attested.focus();
							}
							} />

						<View style={{ flexDirection: 'row' }}>
							<TextInput
								returnKeyType='next'
								ref={component => this._attested = component}
								style={styles.textinputaddbot}
								placeholder="Attested"
								onChangeText={(text) => this.state.attested = text}
								onSubmitEditing={(event) => {
									this.refs._unattested.focus();
								}
								} />
							<TouchableHighlight
								style={styles.bigEditButton}
								onPress={() => {
									this._openLargeEdit(this._attested, this.state.attested);
								}}>
								<Icon name="assignment" style={styles.actionButtonIcon} />
							</TouchableHighlight>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<TextInput
								ref={component => this._unattested = component}
								style={styles.textinputaddbot}
								placeholder="Unattested"
								onChangeText={(text) => this.state.unattested = text}
								onSubmitEditing={this.onPressButton.bind(this)}
								returnKeyType='go'
							/>
							<TouchableHighlight
								style={styles.bigEditButton}
								onPress={() => {
									this._openLargeEdit(this._unattested, this.state.unattested);
								}}>
								<Icon name="assignment" style={styles.actionButtonIcon} />
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
								style={styles.btn_translate}
								underlayColor="black"
								onPress={this.onPressButton.bind(this)}>
								<Text style={styles.text_translate}>
									Add
          				</Text>
							</TouchableHighlight>
						</View>

						<EditTextModal visible={this.state.edittextmodalvisible} parentRef={this.state.edittextmodalparentref} text={this.state.text} callback={this._editTextModalCallback.bind(this)} />
					</View>
				</View>
			</Modal>
		);
	}
}
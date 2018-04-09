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

import styles from '../modules/styles';
import Titlebar from './titlebar';

export default class EditTextModal extends Component {
	constructor(props) {
		super(props);
		console.log('EditTextModal');
		console.log(props.parentRef);
		this.state={
			error: ''
		}
	}

	//We need this method to change things based off props
	componentWillReceiveProps(props) {
	}

	setModalVisible(visible) {
		this.props.callback(visible);
	}

	onPressButton() {
		this.props.callback(this.props.parentRef, this._textInput.text);
		console.log('Finish Edit');
	}

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => { }}>
				<View style={styles.modalBackground}>
					<Titlebar title="Enter Text:" />
					<Text ref='error' style={styles.texterror}>
						{this.state.error}
					</Text>
					<Text>
						Use ',' ';' ':' characters to insert new line.
					</Text>
					<TextInput
						ref={component => this._textInput = component}
						multiline={true}
						style={styles.textinputbigedit}
						value = {this.props.text}
						onSubmitEditing={this.onPressButton.bind(this)}
						returnKeyType='go'
					/>
					<TouchableHighlight
						style={styles.btn_translate}
						underlayColor="black"
						onPress={this.onPressButton.bind(this)}>
						<Text style={styles.text_translate}>
							Done
          				</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={styles.modalButton}
						onPress={() => {
							this.setModalVisible(false);
						}}>
						<Text style={styles.text_translate}>
							Back
						</Text>
					</TouchableHighlight>
				</View>
			</Modal>
		);
	}
}
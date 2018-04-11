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

import styles from '../modules/styles';
import Titlebar from './titlebar';

export default class EditWordTextModal extends Component {
	constructor(props) {
		super(props);
		console.log('constructor props.text');
		console.log(props.text);
		this.state = {
			error: '',
			text: props.text
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			error: '',
			text: props.text
		});
	}

	setModalVisible(visible) {
		this.props.callback(this.props.parentState, this.state.text);
	}

	onPressButton() {
		Keyboard.dismiss();
		this.props.callback(this.props.parentState, this.state.text);
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
				<View style={styles.modalBackgroundEditText}>
					<Titlebar title={this.props.parentState.toUpperCase()} />
					<Text ref='error' style={styles.texterror}>
						{this.state.error}
					</Text>
					<Text>
						Use ',' ';' characters to insert new line.
					</Text>
					<View style={styles.modalContent}>
						<TextInput
							multiline={true}
							style={styles.textinputbigedit}
							value={this.state.text}
							onChangeText={(text) => this.setState({ text })}
							onSubmitEditing={this.onPressButton.bind(this)}
							returnKeyType='go'
						/>

						<View style={{ flexDirection: 'row' }}>
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
									Keyboard.dismiss();
								}}>
								<Text style={styles.text_translate}>
									Back
						</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}
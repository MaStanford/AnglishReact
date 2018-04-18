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
import TimerMixin from 'react-timer-mixin';

import styles from '../modules/styles';
import Titlebar from './titlebar';
import Network from '../modules/network';
import { store, actions } from '../modules/statemanager';

export default class CommentEditTextModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			info: '',
			text: props.commentText
		}
		console.log('this.state');
		console.log(this.state);
	}

	componentDidMount() {
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	componentWillReceiveProps(props) {
		this.setState({
			error: '',
			info: '',
			text: props.commentText
		});
		console.log('this.state');
		console.log(this.state);
	}

	setModalVisible(success) {
		Keyboard.dismiss();
		if(success){
			this.props.commentCallBack(this.state.text);
		}else{
			this.props.cancelCallback();
		}
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
				<View style={styles.containerModalEditTextBackground}>
					<Titlebar title='Comment' />
					<View style={{ flexDirection: 'column', alignContent: 'center' }}>
						<Text ref='error' style={styles.texterror}>
							{this.state.error}
						</Text>

						<Text ref='info' style={styles.textInfo}>
							{this.state.info}
						</Text>
					</View>
					<View style={styles.containerModalContent}>
						<TextInput
							multiline={true}
							style={styles.textinputbigedit}
							value={this.state.text}
							onChangeText={(text) => this.setState({ text })}
							onSubmitEditing={this.onPressButton}
							returnKeyType='go'
						/>
						<View style={{ flexDirection: 'row' }}>
							<TouchableHighlight
								style={styles.buttonModal}
								onPress={() => this.setModalVisible(false)}>
								<Text style={styles.textTranslate}>
									Back
								</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={styles.buttonModal}
								underlayColor="black"
								onPress={() => this.setModalVisible(true)}>
								<Text style={styles.textTranslate}>
									Comment
          						</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}
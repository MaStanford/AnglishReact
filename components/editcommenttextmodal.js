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
import Network from '../modules/network';
import { store, actions } from '../modules/statemanager';

export default class EditCommentTextModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			info: '',
			text: props.text
		}

		//Sub to state updates
		store.subscribe(() => {
			//If we somehow are here and the user is logged out. 
			if (store.getState().user.permissions < 1) {
				this.setState({ error: 'Invalid permissions to comment.' });
				//this.setModalVisible(visible);
			}
		}).bind(this);

		//Edge case that somehow this is launched when we don't have permissions
		if (!store.getState().session || store.getState().user.permissions < 1) {
			//this.setModalVisible(visible);
			this.setState({ error: 'Invalid permissions to comment.' });
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			error: '',
			text: props.text
		});
	}

	setModalVisible() {
		Keyboard.dismiss();
		this.props.callback();
	}

	_addComment() {
		console.log(this.props.word._id, store.getState().user._id, this.state.text, store.getState().session.token);
		Network.addCommentToWord(this.props.word._id, store.getState().user._id, this.state.text, store.getState().session.token)
			.then(function (res) {
				console.log('_addComment');
				console.log(res);
				if (res && res.code == 1) {
					this.setState({ info: 'Comment added to ' + this.props.word.word});
					this.setState({text: ''});
					setTimeout(setModalVisible, 500);
				} else {
					this.setState({ error: 'Error adding comment: ' + res.result});
				}
			}.bind(this))
			.catch(function (err) {
				console.log('_addComment error');
				console.log(err);
				this.setState({ error: 'Error adding comment: ' + err.message});
			}.bind(this));
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
					<Titlebar title='Comment' />
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
							multiline={true}
							style={styles.textinputbigedit}
							value={this.state.text}
							onChangeText={(text) => this.setState({ text })}
							onSubmitEditing={this.onPressButton}
							returnKeyType='go'
						/>
						<View style={{ flexDirection: 'row' }}>
							<TouchableHighlight
								style={styles.modalButton}
								onPress={() => this.setModalVisible()}>
								<Text style={styles.text_translate}>
									Back
								</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={styles.modalButton}
								underlayColor="black"
								onPress={() => this._addComment()}>
								<Text style={styles.text_translate}>
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
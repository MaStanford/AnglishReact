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
			text: ''
		}

		//Edge case that somehow this is launched when we don't have permissions
		if (!store.getState().session || store.getState().user.permissions < 1) {
			this.setState({ error: 'Invalid permissions to comment.' });
		}
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
			text: props.text
		});
	}

	setModalVisible(success) {
		Keyboard.dismiss();
		this.props.editCommentCallback(success);
	}

	_addComment() {
		Network.addCommentToWord(this.props.word._id, store.getState().user._id, this.state.text, store.getState().session.token)
			.then((res) => {
				if (res && res.code == 1) {
					this.setState({ info: 'Comment added to ' + this.props.word.word});
					setTimeout(() => {this.setModalVisible(true)}, 500);
				} else {
					this.setState({ error: 'Error adding comment: ' + res.result});
				}
			})
			.catch((err) => {
				this.setState({ error: 'Error adding comment: ' + err.message});
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
								onPress={() => this._addComment()}>
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
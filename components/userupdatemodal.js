//React imports
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TextInput,
	Modal,
	Alert
} from 'react-native';

import Picker from 'react-native-picker';

//Icons https://material.io/icons/
import { Icon } from 'react-native-elements'

import styles from '../modules/styles';
import Titlebar from './titlebar';
import UserComponent from './usercomponent';
import Network from '../modules/network';
import WordList from './wordlist';
import CommentList from './commentlist';
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';
import utils from '../modules/utils';

export default class UpdateUserModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: '',
			info: '',
			user: props.user,
			permissions: props.user.permissions,
			wordsVisible: false,
			commentsVisible: false,
			wordList: [],
			commentList: []
		};
	}

	componentDidMount() {
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	setModalVisible() {
		this.props.callback();
	}

	_handlePermissionUpdate = (itemValue, itemIndex) => {
		this.setState({ permissions: itemValue });
	}

	_updateUser = () => {
		Network.updateUserPermissions(this.state.user, this.state.permissions, store.getState().session.token)
			.then((res) => {
				if (res.code == 1) {
					this.setState({ info: 'Successfully updated user' });
					setTimeout(() => { this.setModalVisible() }, 1000);
				} else {
					this.setState({ error: res.result });
				}
			})
			.catch((err) => {
				this.setState({ error: err.message });
			});
	}

	_fetchCommentsByUser() {
		Network.fetchCommentsByUserID(this.state.user._id)
		.then((res) => {
			if(res.code ==1){
				this.setState({commentList:res.data});
			}else{
				this.setState({error: res.result});
			}
		})
		.catch((err) => {
			this.setState({error:err.message});
		});
	}

	_fetchWordsByUser() {

	}

	_onDeleteComment(comment) {
		if (comment.user._id == store.getState().user._id || store.getState().user.permissions >= utils.permissions.mod) {
			Network.deleteCommentByID(comment._id, store.getState().session.token)
				.then((res) => {
					if (res.code == 1) {
						this.setState({ info: 'Comment deleted!' });
						this.setState({ error: '' });
						this._fetchCommentsByUser();
					} else {
						this.setState({ error: 'Error deleting comment: ' + res.result });
						this.setState({ info: '' });
					}
				})
				.catch((error) => {
					this.setState({ error: 'Error deleting comment: ' + error.message });
					this.setState({ info: '' });
				});
		} else {
			this.setState({ error: 'Invalid permissions' });
			this.setState({ info: '' });
		}
	}

	_onDeleteWord(word) {
		this._WIPAlert();
	}

	_WIPAlert() {
		Alert.alert(
			'Feature Incomplete',
			'This feature is no complete yet, I\'m working on getting it done, so keep an eye out for updates',
			[
				{ text: 'OK', onPress: () => { } }
			],
			{ cancelable: false }
		)
	}

	_showPermissionPicker() {
		let data = Object.keys(utils.permissions);
		var selected = utils.getKeyFromValue(utils.permissions, this.state.permissions);
		console.log(selected);
		Picker.init({
			pickerData: data,
			pickerTitleText: 'Select Permission',
			pickerConfirmBtnText: 'Select',
			pickerCancelBtnText: 'Back',
			selectedValue: [selected],
			pickerToolBarFontSize: 18,
			pickerFontColor: [0, 0, 0, 1],
			pickerConfirmBtnColor: [0, 0, 0, 1],
			pickerCancelBtnColor: [0, 0, 0, 1],
			pickerBg: [255, 255, 255, 1],
			pickerToolBarBg: [220, 220, 220, 1], //This is the same as the DCDCDC used in the app for button bg

			onPickerConfirm: data => {
				this.setState({ permissions: utils.permissions[data] });
				this.setState({
					info:
						'Change ' + this.state.user.handle
						+ ' permissions from ' + utils.getKeyFromValue(utils.permissions, this.state.user.permissions)
						+ ' to ' + data + '?'
				});
			},

			onPickerCancel: data => {
				this.setState({ permissions: this.state.permissions });
			},

			onPickerSelect: data => {
			}
		});
		Picker.show();
	}

	_showWordList() {
		this._WIPAlert();
		// this.setState({ wordsVisible: true });
		// this._fetchWordsByUser();
	}

	_getWordList() {
		return (
			<WordList
				word={'User Words:'}
				user={this.state.user}
				wordList={this.state.wordList}
				onPressItem={() => { }}
				onLongPressItem={() => { }}
				onEditItem={() => { this._WIPAlert() }}
				onDeleteItem={(word) => { this._onDeleteWord(word) }} />
		);
	}

	_getWordListModal() {
		var wordList = this._getWordList();
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.wordsVisible}
				onRequestClose={() => {
					this.setState({ wordsVisible: false });
				}
				}>
				<View style={styles.containerModalUserCommentList}>
					<Titlebar title='Words' />
					{wordList}
					<TouchableHighlight
						style={styles.buttonModal}
						underlayColor="black"
						onPress={() => { this.setState({ wordsVisible: false }) }}>
						<Text style={styles.textTranslate}>
							Back
						</Text>
					</TouchableHighlight>
				</View>
			</Modal>
		);
	}

	_showCommentList() {
		this.setState({ commentsVisible: true });
		this._fetchCommentsByUser();
	}

	_getCommentList() {
		return (
			<CommentList
				commentList={this.state.commentList}
				onLongPressItem={(comment) => { }}
				onDeleteItem={(comment) => { this._onDeleteComment(comment) }}
				onEditItem={(comment) => { this._WIPAlert() }} />
		);
	}

	_getCommentListModal() {
		var commentList = this._getCommentList();
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.commentsVisible}
				onRequestClose={() => {
					this.setState({ commentsVisible: false });
				}
				}>
				<View style={styles.containerModalUserCommentList}>
					<Titlebar title='Comments' />
					{commentList}
					<TouchableHighlight
						style={styles.buttonModal}
						underlayColor="black"
						onPress={() => { this.setState({ commentsVisible: false }) }}>
						<Text style={styles.textTranslate}>
							Back
					</Text>
					</TouchableHighlight>
				</View>
			</Modal>
		);
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
		var error = this.state.error == '' ? null : this._getErrorText();
		var info = this.state.info == '' ? null : this._getInfoText();
		var wordsModal = this.state.wordsVisible ? this._getWordListModal() : null;
		var commentsModal = this.state.commentsVisible ? this._getCommentListModal() : null;
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => {
					this.setModalVisible(false);
				}
				}>
				<View style={styles.containerModalPickerPermissions}>
					<Titlebar title='Update User' />
					<UserComponent user={this.state.user} />
					<View style={{ flexDirection: 'column', alignContent: 'center' }}>
						{error}
						{info}
					</View>
					<View style={styles.containerUpdateUserModalButtons}>
						<TouchableHighlight
							style={styles.buttonSelectPermissions}
							underlayColor="black"
							onPress={() => { this._showPermissionPicker(); }}>
							<Text style={styles.textTranslate}>
								Select new permissions
							</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={styles.buttonSelectPermissions}
							underlayColor="black"
							onPress={() => { this._showWordList(); }}>
							<Text style={styles.textTranslate}>
								Show User's words
							</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={styles.buttonSelectPermissions}
							underlayColor="black"
							onPress={() => { this._showCommentList(); }}>
							<Text style={styles.textTranslate}>
								Show User's Comments
							</Text>
						</TouchableHighlight>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<TouchableHighlight
							style={styles.buttonModal}
							underlayColor="black"
							onPress={() => { this.setModalVisible() }}>
							<Text style={styles.textTranslate}>
								Back
							</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={styles.buttonModal}
							underlayColor="black"
							onPress={() => { this._updateUser() }}>
							<Text style={styles.textTranslate}>
								Update
							</Text>
						</TouchableHighlight>
					</View>
					{wordsModal}
					{commentsModal}
				</View>
			</Modal>
		);
	}
}
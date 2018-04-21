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
	Alert,
	ScrollView
} from 'react-native';
import {
	StackNavigator,
} from 'react-navigation';
import ActionButton from 'react-native-action-button';

import styles from '../modules/styles';
import Titlebar from './titlebar';
import UserComponent from './usercomponent';
import ChangePasswordComponent from './changepasswordcomponent';
import Network from '../modules/network';
import WordList from './wordlist';
import CommentList from './commentlist';
import CommentEditTextModal from './commentedittextmodal';
import WordAddModal from './wordaddmodal'
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';
import utils from '../modules/utils';
var appinfo = require('../assets/appinfo.json');

export default class InfoScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: '',
			info: '',
			user: store.getState().user,
			showChangePassword: true,
			wordsVisible: false,
			commentsVisible: false,
			editWord: {},
			editComment: {},
			editCommentVisible: false,
			editWordVisible: false,
			editWord: {},
			wordList: [],
			commentList: []
		};

		store.subscribe(() => {
			this.setState({
				user: store.getState().user
			});
		});
	}

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title
	});

	_fetchCommentsByUser() {
		Network.fetchCommentsByUserID(this.state.user._id)
			.then((res) => {
				if (res.code == 1) {
					this.setState({ commentList: res.data });
				} else {
					this.setState({ error: res.result });
				}
			})
			.catch((err) => {
				this.setState({ error: err.message });
			});
	}

	_fetchWordsByUser() {
		Network.fetchWordsbyUserId(this.state.user._id)
			.then((res) => {
				if (res.code == 1) {
					this.setState({ wordList: res.data });
				} else {
					this.setState({ error: res.result });
				}
			}).catch((err) => {
				this.setState({ error: err.message });
			});
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

	_onEditComment(comment) {
		this.setState({ editCommentVisible: true, editComment: comment });
	}

	_onDeleteWord(word) {
		var wordyword = word;
		if (store.getState().user.permissions >= utils.permissions.mod || word.createdBy == store.getState().user._id) {
			// Works on both iOS and Android
			Alert.alert(
				`Delete ${word.word}?`,
				'Do you want to delete this word? This cannot be undone.',
				[
					{ text: 'Back', onPress: () => { }, style: 'cancel' },
					{ text: 'OK', onPress: (word) => { this._deleteWord(wordyword) } }
				],
				{ cancelable: true }
			)
		}
	}

	_onEditWord(word) {
		this.setState({ editWordVisible: true, editWord: word });
	}

	_deleteWord(word) {
		console.log('Deleting Word!!!');
		Network.deleteWordByID(word._id, store.getState().session.token)
			.then((res) => {
				console.log(res.data);
				if (res.code == 1) {
					this.setState({ error: '' });
					this.setState({ info: 'Word deleted' });
					this._fetchWordsByUser();
				} else {
					this.setState({ error: res.result });
					this.setState({ info: '' });
				}
			})
			.catch((err) => {
				console.log(err);
				this.setState({ error: err.message });
				this.setState({ info: '' });
			});
	}

	_updateComment(text) {
		var comment = this.state.editComment;
		if (comment.user._id == store.getState().user._id) {
			comment.comment = text;
			Network.updateCommentbyID(comment, store.getState().session.token)
				.then((res) => {
					if (res.code == 1) {
						this.setState({ info: 'Comment updated!' });
						this.setState({ error: '' });
						this._fetchComments();
					} else {
						this.setState({ error: 'Error updating comment: ' + res.result });
						this.setState({ info: '' });
					}
				})
				.catch((error) => {
					this.setState({ error: 'Error updating comment: ' + error.message });
					this.setState({ info: '' });
				});
		} else {
			this.setState({ error: 'Invalid permissions' });
			this.setState({ info: '' });
		}
	}

	_showWordList() {
		this.setState({ wordsVisible: true });
		this._fetchWordsByUser();
	}

	_getWordList() {
		return (
			<WordList
				word={'User Words:'}
				user={this.state.user}
				wordList={this.state.wordList}
				onPressItem={() => { }}
				onLongPressItem={() => { }}
				onEditItem={(word) => {
					this._onEditWord(word)
				}}
				onDeleteItem={(word) => {
					this._onDeleteWord(word)
				}} />
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
				onDeleteItem={(comment) => {
					this._onDeleteComment(comment);
				}}
				onEditItem={(comment) => {
					this._onEditComment(comment);
				}}
				user={store.getState().user} />
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

	_editCommentCallback(text) {
		this.setState({ editCommentVisible: false });
		this._updateComment(text);
	}

	_cancelCommentCallback() {
		this.setState({ editCommentVisible: false });
	}

	_editwordCallback(newWord) {
		this.setState({ editWordVisible: false });
	}

	_onChangePassword() {

	}

	_onCancelPassword() {

	}

	_getCommentEditModal() {
		return (
			<CommentEditTextModal
				visible={this.state.editCommentVisible}
				commentCallBack={(text) => this._editCommentCallback(text)}
				cancelCallback={() => this._cancelCommentCallback()}
				commentText={this.state.editComment.comment}
			/>
		);
	}

	_getWordEditModal() {
		return (
			<WordAddModal
				visible={this.state.editWordVisible}
				callback={(word) => this._editwordCallback(word)}
				word={this.state.editWord}
				isEdit={true}
			/>);
	}

	_getWordContainer() {
		return (
			<View>
				<Text style={styles.textappinfoheader}>Your Word List</Text>
				<TouchableHighlight
					style={styles.buttonShowInfo}
					underlayColor="black"
					onPress={() => { this._showWordList() }}>
					<Text style={styles.textTranslate}>
						Press to Show
				</Text>
				</TouchableHighlight>
			</View>
		);
	}

	_getCommentContainer() {
		return (
			<View>
				<Text style={styles.textappinfoheader}>Your Comment List</Text>
				<TouchableHighlight
					style={styles.buttonShowInfo}
					underlayColor="black"
					onPress={() => { this._showCommentList() }}>
					<Text style={styles.textTranslate}>
						Press to Show
				</Text>
				</TouchableHighlight>
			</View>
		);
	}

	_getChangePasswordComponent() {
		return (
			<ChangePasswordComponent
				onPasswordChanged={() => { this._onChangePassword() }}
				onCancelled={() => { this._onCancelPassword() }}
				user={this.state.user} />
		);
	}

	_getChangePasswordContainer() {
		var changepasswordcomponent = this.state.showChangePassword ? this._getChangePasswordComponent() : null;
		return (
			<View style={{ marginTop: 10 }}>
				{changepasswordcomponent}
			</View>
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
		var wordContainer = this.state.user.permissions != -1 ? this._getWordContainer() : null;
		var commentsModal = this.state.commentsVisible ? this._getCommentListModal() : null;
		var commentEditModal = this.state.editCommentVisible ? this._getCommentEditModal() : null;
		var commentContainer = this.state.user.permissions != -1 ? this._getCommentContainer() : null;
		var wordEditModal = this.state.editWordVisible ? this._getWordEditModal() : null;
		var changePasswordContainer = this.state.user.permissions != -1 ? this._getChangePasswordContainer() : null;
		return (
			<ScrollView>
				<View style={styles.containermain}>
					<Titlebar title="User Info" />
					{error}
					{info}
					<View style={{ borderWidth: 1 }}>
						<UserComponent user={this.state.user} onPressItem={() => { }} />
					</View>

					{wordEditModal}
					{wordsModal}
					{commentEditModal}
					{commentsModal}

					<Text style={styles.textappinfoheader}>App info</Text>
					<Text style={styles.textappinfo}>
						{appinfo.description}
					</Text>

					<Text style={styles.textappinfoheader}>Privacy Policy</Text>
					<Text style={styles.textappinfo}>
						{appinfo.privacy}
					</Text>

					{wordContainer}

					{commentContainer}

					{changePasswordContainer}
				</View>
			</ScrollView>
		);
	}
}

AppRegistry.registerComponent('User', () => UserScreen);
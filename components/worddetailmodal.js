import React, { Component } from 'react';
import {
	Modal,
	Text,
	TouchableHighlight,
	View,
	ScrollView,
	Alert
} from 'react-native';

import styles from '../modules/styles';

import WordListItem from './wordlistitem';

import CommentList from './commentlist';
import CommentEditTextModal from './commentedittextmodal';
import Network from '../modules/network';
import { store, actions } from '../modules/statemanager'

export default class WordDetailModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			permissions: store.getState().user.permissions,
			user: store.getState().user,
			word: props.word,
			commentList: [],
			editComment: {},
			newCommentVisible: false,
			editCommentVisible: false,
			error: '',
			info: ''
		}

		this._mounted = false;

		//Get Comments
		this._fetchComments();

		//Sub to state updates
		store.subscribe(() => {
			if (this._mounted) {
				this.setState({ user: store.getState().user, permission: store.getState().user.permissions });
			}
		});
	}

	componentDidMount() {
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	setModalVisible(visible) {
		this.props.callback(visible);
	}

	_newCommentCallback(text) {
		this.setState({ newCommentVisible: false });
		this._addComment(text);
	}

	_editCommentCallback(text) {
		this.setState({ editCommentVisible: false });
		this._updateComment(text);
	}

	_cancelCommentCallback() {
		this.setState({ editCommentVisible: false, newCommentVisible: false });
	}

	_fetchComments() {
		Network.fetchCommentsByWordID(this.state.word._id)
			.then((res) => {
				if (res && res.code == 1) {
					this.setState({
						commentList: res.data
					});
				} else {
					this.setState({
						error: 'Error fetching comments: ' + res.result,
						info: '',
						commentList: []
					});
				}
			})
			.catch((err) => {
				this.setState({ error: 'Error fetching comments: ' + err.message });
			}
			);
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


	_addComment(text) {
		Network.addCommentToWord(this.props.word._id, store.getState().user._id, text, store.getState().session.token)
			.then((res) => {
				if (res && res.code == 1) {
					this.setState({ info: 'Comment added to ' + this.props.word.word });
					this._fetchComments();
				} else {
					this.setState({ error: 'Error adding comment: ' + res.result });
				}
			})
			.catch((err) => {
				this.setState({ error: 'Error adding comment: ' + err.message });
			});
	}

	_onDeleteComment(comment) {
		if (comment.user._id == store.getState().user._id || store.getState().user.permissions >= utils.permissions.mod) {
			Network.deleteCommentByID(comment._id, store.getState().session.token)
				.then((res) => {
					if (res.code == 1) {
						this.setState({ info: 'Comment deleted!' });
						this.setState({ error: '' });
						this._fetchComments();
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

	_onLongPressComment(comment) {

	}

	_getCommentEditModal() {
		return (
			<CommentEditTextModal
				commentCallBack={(commentSuccess) => this._editCommentCallback(commentSuccess)}
				cancelCallback={() => this._cancelCommentCallback()}
				commentText={this.state.editComment.comment}
			/>
		);
	}

	_getCommentNewModal() {
		return (
			<CommentEditTextModal
				commentCallBack={(commentSuccess) => this._newCommentCallback(commentSuccess)}
				cancelCallback={() => this._cancelCommentCallback()}
				commentText={null}
			/>
		);
	}

	_getBackButton() {
		return (
			<TouchableHighlight
				style={styles.buttonModal}
				onPress={() => {
					this.setModalVisible(false);
				}}>
				<Text style={styles.textTranslate}>
					Back
				</Text>
			</TouchableHighlight>
		);
	}

	_getCommentButton() {
		return (
			<TouchableHighlight
				style={styles.buttonModalAddComment
				}
				onPress={() => {
					this.setState({ newCommentVisible: true });
				}}>
				<Text style={styles.textTranslate}>
					Comment
				</Text>
			</TouchableHighlight>
		);
	}

	_getWordListItem() {
		return (<WordListItem
			onPressItem={() => { }}
			onLongPressItem={(word) => { this._WIPAlert() }}
			onDeleteItem={(word) => { this._WIPAlert() }}
			onEditItem={(word) => { this._WIPAlert() }}
			word={this.state.word}
			user={this.state.user}
		/>);
	}

	_getCommentList() {
		return (<CommentList
			commentList={this.state.commentList}
			onLongPressItem={(comment) => { this._onLongPressComment(comment) }}
			onDeleteItem={(comment) => { this._onDeleteComment(comment) }}
			onEditItem={(comment) => this._onEditComment(comment)} />
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
		title = '';
		//Word and commentlist, comment list has the edit and delete buttons.
		var wordlistitem = this._getWordListItem();
		var commentList = this._getCommentList();

		//Modal for adding and modal for updating
		var commentEditModal = this.state.editCommentVisible ? this._getCommentEditModal() : null;
		var commentNewModal = this.state.newCommentVisible ? this._getCommentNewModal() : null;

		//Buttons, comment makes new comment visible.
		var backButton = this._getBackButton();
		var commentButton = this.state.permissions > 0 ? this._getCommentButton() : null;

		var error = this.state.error == '' ? null : this._getErrorText();
		var info = this.state.info == '' ? null : this._getInfoText();

		if (this.props.word.word) {
			title = this.props.word.word.toUpperCase();
		}
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => {
					this.setModalVisible(false);
				}
				}>
				<View style={styles.containerModalMain}>
					<View style={styles.containerModalContent}>
						<ScrollView style={{ height: '85%' }}>
							<Text style={styles.wordlistheader}>{title}</Text>
							<View style={{ borderWidth: 1 }}>
								{wordlistitem}
							</View>
							{error}
							{info}
							<Text style={styles.textCommentHeader}>Comments: </Text>
							{commentList}
						</ScrollView>
						<View style={{ flexDirection: 'row' }}>
							{backButton}
							{commentButton}
						</View>
					</View>
					{commentEditModal}
					{commentNewModal}
				</View>
			</Modal>
		);
	}
}
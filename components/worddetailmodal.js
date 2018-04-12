import React, { Component } from 'react';
import {
	Modal,
	Text,
	TouchableHighlight,
	View,
	ScrollView
} from 'react-native';

import styles from '../modules/styles';

import WordListItem from './wordlistitem';

import CommentList from './commentlist';
import EditCommentTextModal from './editcommenttextmodal';
import Network from '../modules/network';
import { store, actions } from '../modules/statemanager'

export default class WordDetailModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			permissions: store.getState().user.permissions,
			word: props.word,
			commentText: '',
			editcommentvisible: false,
			error: ''
		}

		//Sub to state updates
		store.subscribe(() => {
			if (this._mounted) {
				this.setState({ permission: store.getState().user.permissions });
			}
		}).bind(this);
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

	_editCommentTextCallback(commentSucces) {
		this.setState({ editcommentvisible: false });
		if (commentSucces) {
			this._fetchComments();
		}
	}

	_getCommentEditModal() {
		return (
			<EditCommentTextModal
				text={this.state.commentText}
				callback={this._editCommentTextCallback.bind(this)}
				word={this.props.word}
			/>
		);
	}

	_getCommentButton() {
		return (
			<TouchableHighlight
				style={styles.buttonModalAddComment
				}
				onPress={() => {
					this.setState({ editcommentvisible: true });
				}}>
				<Text style={styles.textTranslate}>
					Comment
				</Text>
			</TouchableHighlight>
		);
	}

	_fetchComments() {
		Network.fetchCommentsByWordID(this.state.word._id)
			.then(function (res) {
				if (res && res.code == 1) {
					var resultWord = this.state.word;
					resultWord.comments = res.data;
					this.setState({ word: resultWord });
				} else {
					this.setState({ error: 'Error fetching comments: ' + res.result });
				}
			}.bind(this))
			.catch(function (err) {
				this.setState({ error: 'Error fetching comments: ' + err.message });
			}.bind(this));
	}

	render() {
		title = '';
		var commentEditModal = this.state.editcommentvisible ? this._getCommentEditModal() : null;
		var commentButton = this.state.permissions > 0 ? this._getCommentButton() : null;
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
							<View style={{borderWidth: 1}}>
								<WordListItem item={this.state.word} onPressItem={(item) => { }} />
							</View>
							<Text style={styles.textCommentHeader}>Comments: </Text>
							<CommentList word={this.state.word} longPressCallback={(comment) => {console.log('Long press on comment' + comment.comment)}} />
						</ScrollView>
						<View style={{ flexDirection: 'row' }}>
							<TouchableHighlight
								style={styles.buttonModal}
								onPress={() => {
									this.setModalVisible(false);
								}}>
								<Text style={styles.textTranslate}>
									Back
							</Text>
							</TouchableHighlight>
							{commentButton}
						</View>
					</View>
					{commentEditModal}
				</View>
			</Modal>
		);
	}
}
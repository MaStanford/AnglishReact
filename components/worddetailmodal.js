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
			user:store.getState().user,
			word: props.word,
			editcommentvisible: false,
			error: ''
		}

		this._mounted = false;

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

	_editCommentTextCallback(commentSucces) {
		this.setState({ editcommentvisible: false });
		if (commentSucces) {
			this._fetchComments();
		}
	}

	_getCommentEditModal() {
		return (
			<EditCommentTextModal
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

	_onPressItem(){
	
	}

	_getWordListItem(){
		return(<WordListItem
			onPressItem={this._onPressItem}
			onLongPressItem={() => {}}
			onDeleteItem={()=>{}}
			onEditItem={()=>{}}
			word={this.state.word}
			user={this.state.user}
		/>);
	}
	render() {
		title = '';
		var wordlistitem = this._getWordListItem();
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
								{wordlistitem}
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
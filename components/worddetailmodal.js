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

export default class WordDetailModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			word: props.word,
			commentText: '',
			editcommentvisible: false,
			error: ''
		}
	}

	setModalVisible(visible) {
		this.props.callback(visible);
	}

	_editCommentTextCallback(commentSucces) {
		this.setState({ editcommentvisible: false });
		if(commentSucces){
			this._fetchComments();
		}
	}

	_getCommentModal() {
		return (
			<EditCommentTextModal
				text={this.state.commentText}
				callback={this._editCommentTextCallback.bind(this)}
				word={this.props.word}
			/>
		);
	}

	_fetchComments(){
		Network.fetchCommentsByWordID(this.state.word._id)
		.then(function(res){
			if(res && res.code == 1){
				var resultWord = this.state.word;
				resultWord.comments = res.data;
				this.setState({word:resultWord});
			}else{
				this.setState({error:'Error fetching comments: ' + res.result});
			}
		}.bind(this))
		.catch(function(err){
			this.setState({error:'Error fetching comments: ' + err.message});
		}.bind(this));
	}

	render() {
		title = '';
		var commentModal = this.state.editcommentvisible ? this._getCommentModal() : null;
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
				<View style={styles.modalBackground}>
					<View style={styles.modalContent}>
						<ScrollView>
							<Text style={styles.wordlistheader}>{title}</Text>
							<WordListItem item={this.state.word} onPressItem={(item) => { }} />
							<Text style={styles.commentheadertext}>Comments: </Text>
							<CommentList word={this.state.word} callback={(comment) => { }} />
						</ScrollView>

						<View style={{ flexDirection: 'row' }}>
							<TouchableHighlight
								style={styles.modalButton}
								onPress={() => {
									this.setModalVisible(false);
								}}>
								<Text style={styles.text_translate}>
									Back
							</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={styles.modalButtonAddComment}
								onPress={() => {
									this.setState({ editcommentvisible: true });
								}}>
								<Text style={styles.text_translate}>
									Comment
								</Text>
							</TouchableHighlight>
						</View>
					</View>
					{commentModal}
				</View>
			</Modal>
		);
	}
}
import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import NetworkUtils from '../modules/network';

//styles
import styles from '../modules/styles';

import CommentListItem from './commentlistitem';
import { store } from '../modules/statemanager';
import network from '../modules/network';
import utils from '../modules/utils';

export default class CommentList extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			error: '',
			dataSource: this.template
		};

		this.fetchData(props.word._id);

		//Ontouch callback for each item in the list.
		this.callback = props.callback;
	}

	template = [{
		_id: '_id',
		user: {
			handle: ''
		},
		word: '',
		createdAt: '',
		updatedAt: '',
		comment: ''
	}]

	fetchData(wordID) {
		if (wordID != null || wordID != '') {
			NetworkUtils.fetchCommentsByWordID(wordID)
				.then((res) => {
					if (res.data.length > 0) {
						this.setState({ dataSource: res.data });
					} else {
						this.setState({ dataSource: this.template });
					}
				}).catch((error) => {

				});
		}
	}

	componentWillReceiveProps(props) {
		this.fetchData(props.word._id);
	}

	_onLongPressItem = (comment) => {
		this.callback(comment);
	};

	_onDeleteComment = (comment) => {
		console.log('_onDeleteComment');
		console.log(comment);
		console.log(store.getState().user);
		if(comment.user._id == store.getState().user._id || store.getState().user.permissions >= utils.permissions.mod){
			network.deleteCommentByID(comment._id, store.getState().session.token)
			.then((res) => {
				if(res.code == 1){
					this.setState({info: 'Comment deleted!'});
					this.setState({error: ''});
					this.fetchData(comment.word);
				}else{
					this.setState({error: 'Error deleting comment: ' + res.result});
					this.setState({info: ''});
				}
			})
			.catch((error) => {
				this.setState({error: 'Error deleting comment: ' + error.message});
				this.setState({info: ''});
			});
		}else{
			this.setState({error: 'Invalid permissions'});
			this.setState({info: ''});
		}
	}

	_renderItem = ({ item, index }) => (
		<CommentListItem
			onLongPress={this._onLongPressItem}
			onDeletePress={this._onDeleteComment}
			item={item}
			user={store.getState().user}
		/>
	);

	_renderSeperator = ({ word }) => (
		<Text>--------------------------------------</Text>
	);

	_getInfoText(){
		return (
			<View style={{ flexDirection: 'column', alignContent: 'center' }}>
				<Text ref='info' style={styles.textInfo}>
					{this.state.info}
				</Text>
			</View>
		);
	}

	_getErrorText(){
		return(
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
		return (
			<View style={styles.flatListComments}>
				{error}
				{info}
				<FlatList
					data={this.state.dataSource}
					keyExtractor={(item, index) => item._id}
					extraData={this.state.dataSource}
					ItemSeparatorComponent={this._renderSeperator}
					renderItem={this._renderItem}
				/>
			</View>
		);
	}
}
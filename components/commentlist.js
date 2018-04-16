import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, Alert } from 'react-native';

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
			dataSource: props.commentList
		};
	}

	componentWillReceiveProps(props) {
		this.setState({dataSource: props.commentList});
	}

	_onLongPressItem = (comment) => {
		this.props.onLongPressItem(comment);
	};

	_onDeleteComment = (comment) => {
		this.props.onDeleteItem(comment);
	}

	_onEditItem = (comment) => {
		this.props.onEditItem(comment);
	}

	_deleteCommentAlert(comment) {
		// Works on both iOS and Android
		Alert.alert(
			'Delete Comment?',
			'Do you want to delete this comment? This cannot be undone.',
			[
				{ text: 'Back', onPress: () => {}, style: 'cancel' },
				{ text: 'OK', onPress: () => {this._onDeleteComment(comment)}}
			],
			{ cancelable: true }
		)
	}

	_renderItem = ({ item, index }) => (
		<CommentListItem
			onLongPressItem={(item) => {this._onLongPressItem(item)}}
			onDeleteItem={(comment) => {this._deleteCommentAlert(comment)}}
			onEditItem={(item)=>{this._onEditItem()}}
			item={item}
			user={store.getState().user}
		/>
	);

	_renderSeperator = ({ word }) => (
		<View style={{borderBottomWidth:1}}/>
	);

	render() {
		return (
			<View style={styles.flatListComments}>
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
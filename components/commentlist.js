import React, { Component } from 'react';
import {FlatList, Text, View, TouchableOpacity } from 'react-native';
import NetworkUtils from '../modules/network';

//styles
import styles from '../modules/styles';

//Store
import { store, actions } from '../modules/statemanager'

import CommentListItem from './commentlistitem';

export default class CommentList extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			dataSource: this.template
		};

		this.fetchData(props.word._id); //Just fetch the default word passed in.

		//Ontouch callback for each item in the list.
		this.callback = props.callback;
	}

	template = [{
		_id: '_id',
		user: {},
		word: '',
		createdAt: '',
		updatedAt: '',
		comment: ''
	}]

	fetchData(wordID) {
		if (wordID != null || wordID != '') {
			NetworkUtils.fetchCommentsByWordID(wordID)
				.then((res) => {
					console.log(res);
					if (res.data.length > 0) {
						this.setState({ dataSource: res.data });
					} else {
						this.setState({ dataSource: this.template });
					}
				}).catch((error) => {
					console.log(error);
				});
		}
	}

	componentWillReceiveProps(props) {
		this.fetchData(props.word);
	}

	_onPressItem = (comment) => {
		this.callback(comment);
	};

	_renderItem = ({ item, index }) => (
		<CommentListItem
			onPressItem={this._onPressItem}
			item={item}
		/>
	);

	_renderSeperator = ({word}) => (
		<Text>--------------------------------------</Text>
	);

	render() {
		return (
			<View style={styles.commentWordlist}>
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
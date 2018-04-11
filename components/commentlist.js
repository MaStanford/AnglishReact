import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import NetworkUtils from '../modules/network';

//styles
import styles from '../modules/styles';

import CommentListItem from './commentlistitem';

export default class CommentList extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			error: '',
			dataSource: this.props.word.comments ? this.props.word.comments : this.template
		};

		this.fetchData(props.word._id);

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
				.then(function (res) {
					if (res.data.length > 0) {
						this.setState({ dataSource: res.data });
					} else {
						this.setState({ dataSource: this.template });
					}
				}.bind(this)).catch(function (error) {

				}.bind(this));
		}
	}

	componentWillReceiveProps(props) {
		this.fetchData(props.word._id);
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

	_renderSeperator = ({ word }) => (
		<Text>--------------------------------------</Text>
	);

	render() {
		return (
			<View style={styles.commentWordlist}>
				<View style={{ flexDirection: 'column', alignContent: 'center' }}>
					<Text ref='error' style={styles.texterror}>
						{this.state.error}
					</Text>

					<Text ref='info' style={styles.textInfo}>
						{this.state.info}
					</Text>
				</View>
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
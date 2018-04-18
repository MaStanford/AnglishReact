import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';

//Icons https://material.io/icons/
import { Icon } from 'react-native-elements'

import styles from '../modules/styles';
import utils from '../modules/utils';

export default class CommentListItem extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	_onLongPress = () => {
		this.props.onLongPressItem(this.props.item);
	};

	_deleteComment = () => {
		this.props.onDeleteItem(this.props.item);
	}

	_editComment = () => {
		this.props.onEditItem(this.props.item);
	}

	_getDeleteButton = () =>  {
		return (
			<TouchableHighlight
				style={styles.buttonDeleteComment}
				onPress={() => {
					this._deleteComment();
				}}>
				<Icon name="delete" style={styles.buttonDeleteComment} />
			</TouchableHighlight>
		);
	}

	_getEditButton() {
		return (
			<TouchableHighlight
				style={styles.buttonDeleteComment}
				onPress={() => {
					this._editComment();
				}}>
				<Icon name="mode-edit" style={styles.buttonDeleteComment} />
			</TouchableHighlight>
		);
	}

	_formatDate(date) {
		return utils.formatDate(date);
	}

	render() {
		var deleteButton = this.props.user._id === this.props.item.user._id  || this.props.user.permissions >= utils.permissions.mod ? this._getDeleteButton() : null;
		var editButton = this.props.user._id === this.props.item.user._id ? this._getEditButton() : null;
		return (
			<TouchableOpacity onLongPress={this._onLongPress}>
				<View key={this.props.item._id}>
					<View style={styles.rowComments}>
						<Text style={styles.textRowLabel}>Handle: </Text>
						<Text style={styles.textdef}>{this.props.item.user.handle}</Text>
					</View>
					<View style={styles.rowComments}>
						<Text style={styles.textRowLabel}>Date: </Text>
						<Text style={styles.textdef}>{this._formatDate(this.props.item.createdAt)}</Text>
					</View>
					<View style={styles.rowComments}>
						<Text style={styles.textRowLabel}>Comment: </Text>
						<Text style={styles.textdef}>{this.props.item.comment}</Text>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
						{editButton}
						{deleteButton}
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}
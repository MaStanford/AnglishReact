import React, { Component } from 'react';
import {Text, View, TouchableOpacity } from 'react-native';

import styles from '../modules/styles';
import utils from '../modules/utils';

export default class CommentListItem extends React.PureComponent {
	constructor(props){
		super(props);
	}

	_onPress = () => {
		this.props.onPressItem(this.props.item);
	};

	formatDate(date){
		return utils.formatDate(date);
	}
	render() {
		return (
			<TouchableOpacity onPress={this._onPress}>
				<View key={this.props.item._id}>
					<View style={styles.commentRow}>
						<Text style={styles.textRowLabel}>Handle: </Text>
						<Text style={styles.textdef}>{this.props.item.user.handle}</Text>
					</View>
					<View style={styles.commentRow}>
						<Text style={styles.textRowLabel}>Date: </Text>
						<Text style={styles.textdef}>{this.formatDate(this.props.item.createdAt)}</Text>
					</View>
					<View style={styles.commentRow}>
						<Text style={styles.textRowLabel}>Comment: </Text>
						<Text style={styles.textdef}>{this.props.item.comment}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}
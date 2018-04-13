import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from '../modules/styles';
import utils from '../modules/utils';

export default class UserComponent extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	_onPress = () => {
		this.props.onPressItem(this.props.user)
	};

	formatDate(date) {
		return utils.formatDate(date);
	}

	render() {
		return (
			<TouchableOpacity onPress={this._onPress}>
				<View style={styles.rowUsers}>
					<Text>Handle: </Text>
					<Text>{this.props.user.handle}</Text>
				</View>
				<View style={styles.rowUsers}>
					<Text>Email: </Text>
					<Text>{this.props.user.email}</Text>
				</View>
				<View style={styles.rowUsers}>
					<Text>Permissions: </Text>
					<Text>{utils.getKeyFromValue(utils.permissions, this.props.user.permissions)}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
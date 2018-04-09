import React, { Component } from 'react';
import {Text, View, TouchableOpacity } from 'react-native';

import styles from '../modules/styles';

export default class WordListItem extends React.PureComponent {
	constructor(props){
		super(props);
	}

	_onPress = () => {
		this.props.onPressItem(this.props.item);
	};

	render() {
		return (
			<TouchableOpacity onPress={this._onPress}>
				<View key={this.props.item._id}>
					<View style={styles.wordRow}>
						<Text style={styles.textRowLabel}>Word             :</Text>
						<Text style={styles.textdef}>{this.props.item.word}</Text>
					</View>
					<View style={styles.wordRow}>
						<Text style={styles.textRowLabel}>Type              :</Text>
						<Text style={styles.textdef}>{this.props.item.type}</Text>
					</View>
					<View style={styles.wordRow}>
						<Text style={styles.textRowLabel}>Attested       :</Text>
						<Text style={styles.textdef}>{this.props.item.attested.split(',').join('\n').split(';').join('\n')}</Text>
					</View>
					<View style={styles.wordRow}>
						<Text style={styles.textRowLabel}>Unattested  :</Text>
						<Text style={styles.textdef}>{this.props.item.unattested.split(',').join('\n').split(';').join('\n')}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

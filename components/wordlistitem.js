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
				<View style={styles.containerwordlist} key={this.props.item.key}>
					<View style={styles.row}>
						<Text style={styles.text}>Word            :</Text>
						<Text style={styles.textdef}>{this.props.item.word}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.text}>Type             :</Text>
						<Text style={styles.textdef}>{this.props.item.type}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.text}>Attested      :</Text>
						<Text style={styles.textdef}>{this.props.item.attested.split(',').join('\n')}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.text}>Unattested :</Text>
						<Text style={styles.textdef}>{this.props.item.unattested.split(',').join('\n')}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

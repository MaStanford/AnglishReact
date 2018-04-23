import React, { Component } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';

import styles from '../modules/styles';
import utils from '../modules/utils';
var appinfo = require('../assets/appinfo.json');

export default class DonateComponent extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (

			<View>
				<Text>
					Please help support this app by donating bitcoin.
					Donations help offset the server costs and the costs associated with hosting apps on the appstore and playstore.
				</Text>

				<TextInput
					multiline={true}
					style={styles.textbitcoin}
					value={appinfo.bitcoinaddress}
					onChangeText={(text) => { }}
					onSubmitEditing={() => { }}
				/>
				<Image style={styles.imagedonate} source={require('../assets/bitcoinaddress.png')} />
			</View>
		);
	}
}
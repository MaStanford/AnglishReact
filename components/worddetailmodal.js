import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

import styles from '../modules/styles';

export default class WordDetailModal extends Component {

	constructor(props) {
		super(props);
	}

	setModalVisible(visible) {
		this.props.callback(visible);
	}

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => {
					alert('Modal has been closed.');
				}}>
				<View style={styles.modalBackground}>
					<View>
						<Text>Detail view modal</Text>
						<Text>{JSON.stringify(this.props.word)}</Text>
						<TouchableHighlight
							onPress={() => {
								this.setModalVisible(false);
							}}>
							<Text>BACK</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
		);
	}
}
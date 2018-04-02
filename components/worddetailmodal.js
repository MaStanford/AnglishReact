import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, ScrollView } from 'react-native';

import styles from '../modules/styles';

import WordListItem from './wordlistitem';

export default class WordDetailModal extends Component {

	constructor(props) {
		super(props);
	}

	setModalVisible(visible) {
		this.props.callback(visible);
	}

	render() {
		title = '';
		if (this.props.word.word) {
			title = this.props.word.word.toUpperCase();
		}
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => {
					alert('Modal has been closed.');
				}}>
				<View style={styles.modalBackground}>
					<View style={styles.modalContent}>
						<ScrollView>
							<Text>{title}</Text>
							<WordListItem item={this.props.word} onPressItem={(item) => { }} />
						</ScrollView>
						<TouchableHighlight
							style={styles.modalButton}
							onPress={() => {
								this.setModalVisible(false);
							}}>
							<Text style={styles.text_translate}>
								Back
							</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
		);
	}
}
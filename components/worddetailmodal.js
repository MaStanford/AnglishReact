import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, ScrollView } from 'react-native';

import styles from '../modules/styles';

import WordListItem from './wordlistitem';

import CommentList from './commentlist';

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
				onRequestClose={() => { }}>
				<View style={styles.modalBackground}>
					<View style={styles.modalContent}>
						<ScrollView>
							<Text style={styles.wordlistheader}>{title}</Text>
							<WordListItem item={this.props.word} onPressItem={(item) => { }} />
							<Text style={styles.commentheadertext}>Comments: </Text>
							<CommentList word={this.props.word} callback={(comment) => { }} />
						</ScrollView>

						<View style={{ flexDirection: 'row' }}>
							<TouchableHighlight
								style={styles.modalButton}
								onPress={() => {
									this.setModalVisible(false);
								}}>
								<Text style={styles.text_translate}>
									Back
							</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={styles.modalButtonAddComment}
								onPress={() => {
									this.setModalVisible(false);
								}}>
								<Text style={styles.text_translate}>
									Comment
							</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}
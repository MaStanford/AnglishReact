import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

export default class WordDetailModal extends Component {

	constructor(props) {
		super(props);
		this.word = props.word;
		this.visible = props.visible;
		this.state = {
			word: this.word,
			modalVisible: this.visible,
		};
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	render() {
		console.log('Visible? : ' + this.props.visible + ': ' + this.state.modalVisible);
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.state.modalVisible}
				onRequestClose={() => {
					alert('Modal has been closed.');
				}}>
				<View style={{ marginTop: 22 }}>
					<View>
						<Text>Hello World!</Text>

						<TouchableHighlight
							onPress={() => {
								this.setModalVisible(!this.state.modalVisible);
							}}>
							<Text>Hide Modal</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
		);
	}
}
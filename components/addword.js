//React imports
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TextInput,
	Button
} from 'react-native';
import {
	StackNavigator,
} from 'react-navigation';
import ActionButton from 'react-native-action-button';

import styles from '../modules/styles';
import Titlebar from './titlebar';
import Network from '../modules/network';
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';

export default class AddWord extends Component {

	constructor(props) {
		super(props);
		this.state = {
			word: '',
			type: '',
			attested: '',
			unattested: ''
		};
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Anglish Wordbook'
	});

	onPressButton() {
		this.setState({
			word: this.state.word,
			type: this.state.type,
			attested: this.state.attested,
			unattested: this.state.unattested
		});
		console.log('Add Button pressed');
	}

	render() {
		return (
			<View style={styles.containermain}>
				<Titlebar title="Add new word" />
				<Text ref='error' style={styles.texterror}>
					{this.state.error}
				</Text>
				<TextInput
					returnKeyType='next'
					style={styles.textinput}
					placeholder="Word"
					onChangeText={(text) => this.state.word = text.toLowerCase()}
					onSubmitEditing={(event) => {
						this.refs.secondinput.focus();
					}
					}
				/>
				<TextInput
					returnKeyType='next'
					ref='secondinput'
					style={styles.textinput}
					placeholder="Type"
					onChangeText={(text) => this.state.type = text.toLowerCase()}
					onSubmitEditing={(event) => {
						this.refs.thirdinput.focus();
					}
					}
				/>
				<TextInput
					returnKeyType='next'
					ref='thirdinput'
					style={styles.textinput}
					placeholder="Attested"
					onChangeText={(text) => this.state.attested = text.toLowerCase()}
					onSubmitEditing={(event) => {
						this.refs.fourthinput.focus();
					}
					}
				/>
				<TextInput
					ref='fourthinput'
					style={styles.textinputpassword}
					placeholder="Unattested"
					onChangeText={(text) => this.state.unattested = text.toLowerCase()}
					onSubmitEditing={this.onPressButton.bind(this)}
					returnKeyType='go'
				/>
				<TouchableHighlight
					style={styles.btn_translate}
					underlayColor="black"
					onPress={this.onPressButton.bind(this)}>
					<Text style={styles.text_translate}>
						Add
          			</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

AppRegistry.registerComponent('Add', () => AddWord);
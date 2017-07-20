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

import styles from './styles';
import Titlebar from './titlebar';
import Network from './network';
import {store, actions} from './statemanager';

export default class Login extends Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			res: {}
		};
	}

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
	});
	
	onPressButton() {
    this.setState({
			email: this.state.email,
			password: this.state.password
		});

		Network.login(this.state.email, this.state.password)
			.then((res) => {
				this.setState({res : res.data});
				store.dispatch({
					type: actions.LOGGED_IN,
					user: res.data
				});
				const { navigate } = this.props.navigation;
      	navigate('home', { title: 'Anglish WordBook' });
			})
			.catch((err) => {
				this.setState({res : err.message});
				const { navigate } = this.props.navigation;
      	navigate('home', { title: 'Anglish WordBook' });
			});
		
		console.log('Login Button pressed');
  }
	
	render(){
		return (
			<View style={styles.containermain}>
				<Titlebar title="Account Login"/>
				<Text>{JSON.stringify(this.state)}</Text>
				<TextInput
          style={styles.textinput}
          placeholder="Email"
          onChangeText= {(text) => this.state.email = text}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Password"
          onChangeText= {(text) => this.state.password = text}
          onSubmitEditing = {this.onPressButton.bind(this)}
        />
        <TouchableHighlight 
          style={styles.btn_translate}
          underlayColor="black"
          onPress={this.onPressButton.bind(this)}>
          <Text style={styles.text_translate}>
            Login
          </Text>
        </TouchableHighlight>
			</View>
		);
	}
}

AppRegistry.registerComponent('Login', () => Login);
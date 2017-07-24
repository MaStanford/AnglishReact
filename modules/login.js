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
			error: ''
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
				if(res.code == 1){
					store.dispatch({
						type: actions.SESSION, 
						session: res.data
					});
					return res.data;
				}else{
					throw new Error(res.data);
				}
			})
			.then((session) => {
					Network.getuser(this.state.email).then((res) => {
							store.dispatch({
								type: actions.USER, 
								user: res.data
							});
							const {goBack} = this.props.navigation;
							goBack();
					}).catch((err) => {
							this.setState({error: 'Unable to find user'});
					});
			})
			.catch((err) => {
				this.setState({error: err.message});
			});
		
		console.log('Login Button pressed');
	}
	
	render(){
		return (
			<View style={styles.containermain}>
				<Titlebar title="Account Login"/>
				<Text ref='error' style={styles.texterror}>
					{this.state.error}
				</Text>
				<TextInput
					returnKeyType='next'
          style={styles.textinput}
          placeholder="Email"
          onChangeText= {(text) => this.state.email = text}
					onSubmitEditing={(event) => { 
							this.refs.SecondInput.focus(); 
						}
					}					
        />
        <TextInput
  				ref='SecondInput'
          style={styles.textinputpassword}
          placeholder="Password"
          onChangeText= {(text) => this.state.password = text}
          onSubmitEditing = {this.onPressButton.bind(this)}
					secureTextEntry= {true}
					returnKeyType='go'
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
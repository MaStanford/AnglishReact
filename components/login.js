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
import {store, actions} from '../modules/statemanager';
import {storage, keys} from '../modules/storage';

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
		this.getSession(this.state.email, this.state.password);
		this.getUser(this.state.email);
		console.log('Login Button pressed');
	}

	getSession(email, password){
		Network.login(email, password)
		.then((res) => {
			if(res.code == 1){
				storage.store(keys.session, JSON.stringify(res.data)).then(()=>{
					//Hurray
				}).catch((error)=>{
					throw new Error(error);
				});
				store.dispatch({
					type: actions.SESSION, 
					session: res.data
				});
				return res.data;
			}else{
				throw new Error(res.data);
			}
		})
		.catch((err) => {
			this.setState({error: err.message});
		});
	}

	getUser(email){
		Network.getuser(email)
		.then((res) => {
			if(res.code == 1){	
				storage.store(keys.user, JSON.stringify(res.data)).then(()=>{}).catch(()=>{});
				store.dispatch({
					type: actions.USER, 
					user: res.data
				});	
				const {goBack} = this.props.navigation;
				goBack();
				return res.data;
			}else{
				throw new Error(res.data);
			}
		})
		.catch((err) => {
				this.setState({error: 'Unable to find user'});
		});
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
          onChangeText= {(text) => this.state.email = text.toLowerCase()}
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
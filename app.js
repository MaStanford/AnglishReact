//React imports
import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Button
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';


//styles
import styles from './modules/styles';

//Custom Component
import Titlebar from './modules/titlebar';
import ComponentWordList from './modules/componentwordlist';
import Menu from './modules/menu';

//Store
import {store, actions} from './modules/statemanager';
import {storage, keys} from './modules/storage';

//Screens
import Login from './modules/login';

class Homescreen extends React.Component {
  
  static navigationOptions = {
    title: 'Anglish Wordbook',
  };

  constructor(props){
    super(props);
    this.state = {
      input:'',
      word:'language'
    }
    store.subscribe(() => {
      console.log('Store updated in index');
    });
  }

  onPressButton() {
    this.setState({word: this.state.input});
    console.log('Button pressed');
  }

  handleNavigation(action){
    console.log(action);
    if(action === 'Logout'){
      storage.clear(keys.session);
      storage.clear(keys.user);
      store.dispatch({type:actions.LOGGED_OUT});
    }else{
      console.log(this.props);
      console.log(this.navigate);
      this.props.navigation.navigate(action, { title: action });
    }
  }

  render() {
    return (
      <View style={styles.containermain}>
        <Titlebar title="Word lookup"/>
        <TextInput
          style={styles.textinput}
          placeholder="Type here to translate!"
          onChangeText= {(text) => this.state.input = text}
          onSubmitEditing = {this.onPressButton.bind(this)}/>
        <TouchableHighlight 
          style={styles.btn_translate}
          underlayColor="black"
          onPress={this.onPressButton.bind(this)}>
          <Text style={styles.text_translate}>
            Translate
          </Text>
        </TouchableHighlight>
        <ComponentWordList word={this.state.word}/>
        <Menu callback={(action) => this.handleNavigation(action)}/>
      </View>
    );
  }
}

//Navigation screens
const AnglishWordbookNavigator = StackNavigator({
  Home: {screen: Homescreen},
  Login: {screen: Login }
});

const AppNavigation = () => (
  <AnglishWordbookNavigator/>
);

export default class App extends React.Component {
  render() {
    return (
        <AppNavigation/>
    );
  }
}
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
import Titlebar from './components/titlebar';
import ComponentWordList from './components/componentwordlist';
import Menu from './components/menu';

//Store
import {store, actions} from './modules/statemanager';
import {storage, keys} from './modules/storage';

//Screens
import Login from './components/login';
import Register from './components/register';
import AddWord from './components/addword';

//Dialog/Modal for word details
import WordDetail from './components/worddetailmodal';

class Homescreen extends React.Component {
  
  static navigationOptions = {
    title: 'Anglish Wordbook',
  };

  constructor(props){
    super(props);
    this.state = {
      input:'',
      word:'',
      detailVisible: false,
      detailWord: {}
    }

    //Get previous state
    storage.fetch(keys.session, (error, result) => {
      session = JSON.parse(result);
      if(result !== null){
        store.dispatch({
					type: actions.SESSION, 
					session: session
				});
      }
    }).catch((error)=>{
      console.log('Error fetchign session ' + error);
    });

    storage.fetch(keys.user, (error, result) => {
      user = JSON.parse(result);
      if(result !== null){
        store.dispatch({
					type: actions.USER, 
					user: user
				});
      }
    }).catch((error)=>{
      console.log('Error fetchign session ' + error);
    });

    //Sub to state updates
    store.subscribe(() => {
      console.log('Store updated in index');
    });
  }

  onPressButton() {
    this.setState({word: this.state.input});
  }

  handleNavigation(action){
    console.log(action);
    if(action === 'Logout'){
      storage.clear(keys.session);
      storage.clear(keys.user);
      store.dispatch({type:actions.LOGGED_OUT});      
    }else{
      this.props.navigation.navigate(action, { title: action });
    }
  }

  wordDetailSelectCallback(word){
    this.setState({
      detailVisible: true,
      detailWord: word
    });
  }

  _detailCallback(){
    this.setState({
      detailVisible: false
    });
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.containermain}>
        <Titlebar title="Word lookup"/>
        <TextInput
          style={styles.textinput}
          placeholder="Type here to translate!"
          onChangeText= {(text) => this.state.input = text.toLowerCase()}
          onSubmitEditing = {this.onPressButton.bind(this)}/>
        <TouchableHighlight 
          style={styles.btn_translate}
          underlayColor="black"
          onPress={this.onPressButton.bind(this)}>
          <Text style={styles.text_translate}>
            Translate
          </Text>
        </TouchableHighlight>
        <ComponentWordList style={styles.componentwordlist} word={this.state.word} callback={this.wordDetailSelectCallback.bind(this)}/>
        <Menu callback={(action) => this.handleNavigation(action)}/>
        <WordDetail visible={this.state.detailVisible} word={this.state.detailWord} callback={this._detailCallback.bind(this)}/>
      </View>
    );
  }
}

//Navigation screens
const AnglishWordbookNavigator = StackNavigator({
  Home: {screen: Homescreen},
  Login: {screen: Login },
  Register: {screen: Register},
  Add: {screen: AddWord}
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
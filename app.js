//React imports
import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Button,
  Keyboard,
  BackHandler
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';


//styles
import styles from './modules/styles';

//Custom Component
import Titlebar from './components/titlebar';
import WordList from './components/wordlist';
import Menu from './components/menu';
import { MenuActions } from './components/menu';

//Store
import { store, actions } from './modules/statemanager';
import { storage, keys } from './modules/storage';

//Screens
import Login from './components/login';
import Register from './components/register';

//Dialog/Modals
import WordDetail from './components/worddetailmodal';
import AddWordModal from './components/addwordmodal';

class Homescreen extends React.Component {

  static navigationOptions = {
    title: 'Anglish Wordbook',
  };

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      word: '',
      detailVisible: false,
      addwordvisible: false,
      detailWord: {}
    }

    //Get previous state
    storage.fetch(keys.session, (error, result) => {
      session = JSON.parse(result);
      if (result !== null) {
        store.dispatch({
          type: actions.SESSION,
          session: session
        });
      }
    }).catch((error) => {
      console.log('Error fetchign session ' + error);
    });

    storage.fetch(keys.user, (error, result) => {
      user = JSON.parse(result);
      if (result !== null) {
        store.dispatch({
          type: actions.USER,
          user: user
        });
      }
    }).catch((error) => {
      console.log('Error fetchign session ' + error);
    });

    //Sub to state updates
    store.subscribe(() => {
      console.log('Store updated in index');
    });

    BackHandler.addEventListener('hardwareBackPress', function(){
      console.log('BackPressed!!!');
    });
  }

  onPressButton() {
    Keyboard.dismiss();
    this.setState({ word: this.state.input });
  }

  handleNavigation(action) {
    console.log(action);
    switch (action) {
      case MenuActions.Logout:
        storage.clear(keys.session);
        storage.clear(keys.user);
        store.dispatch({ type: actions.LOGGED_OUT });
        break;
      case MenuActions.Add:
        this.setState({ addwordvisible: true });
        break;
      default:
        this.props.navigation.navigate(action, { title: action });
        break;
    }
  }

  wordDetailSelectCallback(word) {
    this.setState({
      detailVisible: true,
      detailWord: word
    });
  }

  _detailCallback() {
    this.setState({
      detailVisible: false
    });
  }

  _addwordCallback() {
    this.setState({
      addwordvisible: false
    });
  }

  _getAddWordModal() {
    return (
      <AddWordModal
        visible={this.state.addwordvisible}
        callback={this._addwordCallback.bind(this)}
      />);
  }

  _getWordDetail() {
    return (
      <WordDetail
        visible={this.state.detailVisible}
        word={this.state.detailWord}
        callback={this._detailCallback.bind(this)} />);
  }

  render() {
    var addwordmodal = this.state.addwordvisible ? this._getAddWordModal() : null;
    var wordDetail = this.state.detailVisible ? this._getWordDetail() : null;
    return (
      <View style={styles.containermain}>
        <Titlebar title="Word lookup" />
        <TextInput
          style={styles.textinput}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.state.input = text.toLowerCase().trim()}
          onSubmitEditing={this.onPressButton.bind(this)} />
        <TouchableHighlight
          style={styles.btn_translate}
          underlayColor="black"
          onPress={this.onPressButton.bind(this)}>
          <Text style={styles.text_translate}>
            Translate
          </Text>
        </TouchableHighlight>
        <WordList word={this.state.word} callback={this.wordDetailSelectCallback.bind(this)} />
        <Menu callback={(action) => this.handleNavigation(action)} />
        {wordDetail}
        {addwordmodal}
      </View>
    );
  }
}

//Navigation screens
const AnglishWordbookNavigator = StackNavigator({
  Home: { screen: Homescreen },
  Login: { screen: Login },
  Register: { screen: Register },
});

const AppNavigation = () => (
  <AnglishWordbookNavigator />
);

export default class App extends React.Component {
  render() {
    return (
      <AppNavigation />
    );
  }
}
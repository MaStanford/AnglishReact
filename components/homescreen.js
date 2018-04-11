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
import styles from '../modules/styles';

//Custom Component
import Titlebar from './titlebar';
import WordList from './wordlist';
import Menu from './menu';
import { MenuActions } from './menu';

//Store
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';

//Screens
import LoginScreen from './loginscreen';
import RegisterScreen from './registerscreen';
import UserScreen from './userscreen';
import AdminScreen from './adminscreen';

//Dialog/Modals
import WordDetail from './worddetailmodal';
import AddWordModal from './addwordmodal';

export default class HomeScreen extends React.Component {

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
  }

  onPressButton() {
    Keyboard.dismiss();
    this.setState({ word: this.state.input });
  }

  handleNavigation(action) {
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

  _wordDetailSelectCallback(word) {
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
        <WordList word={this.state.word} callback={this._wordDetailSelectCallback.bind(this)} />
        <Menu callback={(action) => this.handleNavigation(action)} />
        {wordDetail}
        {addwordmodal}
      </View>
    );
  }
}

AppRegistry.registerComponent('Home', () => Homescreen);
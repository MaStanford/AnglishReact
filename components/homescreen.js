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
      user: store.getState().user,
      detailVisible: false,
      addwordvisible: false,
      detailWord: {}
    }

    this._isMounted = 'false'

		store.subscribe(() => {
      if(this._isMounted){
        this.setState({user: store.getState().user});
      }
		});
  }

  componentDidMount() {
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
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
      case MenuActions.User:
        this.props.navigation.navigate(action, { title: action, user: store.getState().user });
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
          style={styles.buttonTranslate}
          underlayColor="black"
          onPress={this.onPressButton.bind(this)}>
          <Text style={styles.textTranslate}>
            Translate
          </Text>
        </TouchableHighlight>
        <WordList word={this.state.word} user={this.state.user} callback={(wordDetail)=>this._wordDetailSelectCallback(wordDetail)} />
        <Menu callback={(action) => this.handleNavigation(action)} />
        {wordDetail}
        {addwordmodal}
      </View>
    );
  }
}

AppRegistry.registerComponent('Home', () => Homescreen);
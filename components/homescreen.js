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
  BackHandler,
  Alert
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';


//styles
import styles from '../modules/styles';

import NetworkUtils from '../modules/network';

//Custom Component
import Titlebar from './titlebar';
import WordList from './wordlist';
import Menu from './menu';
import { MenuActions } from './menu';

//Store
import { store, actions } from '../modules/statemanager';
import { storage, keys } from '../modules/storage';

//Dialog/Modals
import WordDetailModal from './worddetailmodal';
import WordAddModal from './wordaddmodal';

import utils from '../modules/utils';


export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Anglish Wordbook',
  };

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      word: '',
      wordList: [],
      user: store.getState().user,
      detailVisible: false,
      addwordvisible: false,
      editWordVisible: false,
      detailWord: {}
    }

    this._isMounted = 'false'

    store.subscribe(() => {
      if (this._isMounted) {
        this.setState({ user: store.getState().user });
      }
    });
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleNavigation(action) {
    switch (action) {
      case MenuActions.Logout:
        storage.clear(keys.session);
        storage.clear(keys.user);
        store.dispatch({ type: actions.USER_LOGGED_OUT });
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

  _onPressButton() {
    Keyboard.dismiss();
    this.setState({ word: this.state.input });
    this._fetchWordListByWord(this.state.input);
  }

  defTemplate = [{
    _id: '_id',
    word: '',
    type: 'N/A',
    attested: 'N/A',
    unattested: 'N/A'
  }]

  _fetchWordListByWord(word = 'language') {
    if (word === null || word === '') {
      return;
    }
    NetworkUtils.fetchWord(word, 0)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({ wordList: res.data });
        } else {
          var nowordfound = this.defTemplate;
          nowordfound[0].word = this.props.word + ' not found!';
          this.setState({ dataSource: nowordfound });
        }
      }).catch((error) => {
        console.log(error);
      });
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

  _addwordCallback(word) {
    this.setState({
      addwordvisible: false,
      word: word.word
    });
    this._fetchWordListByWord(word.word);
  }

  _editwordCallback(word){
    this.setState({ 
      editWordVisible: false, 
      word: word.word
    });
    this._fetchWordListByWord(word.word);
	}

	_onDeleteWord(word) {
		if (store.getState().user.permissions >= utils.permissions.mod || word.createdBy == store.getState().user._id) {
			// Works on both iOS and Android
			Alert.alert(
				`Delete ${word.word}?`,
				'Do you want to delete this word? This cannot be undone.',
				[
					{ text: 'Back', onPress: () => { }, style: 'cancel' },
					{ text: 'OK', onPress: () => { this._deleteWord(word) } }
				],
				{ cancelable: true }
			)
		}
	}

	_onEditWord(word) {
		this.setState({editWordVisible: true, editWord: word});
	}

	_deleteWord(word) {
		NetworkUtils.deleteWordByID(word._id, store.getState().session.token)
			.then((res) => {
				if (res.code == 1) {
					this.setState({ error: '' });
					this.setState({ info: 'Word deleted' });
					setTimeout(() => { this.setState({editWordVisible: false})}, 500);
				} else {
					this.setState({ error: res.result });
					this.setState({ info: '' });
				}
			})
			.catch((err) => {
				this.setState({ error: err.message });
				this.setState({ info: '' });
			});
  }
  
  _getWordDetail() {
    return (
      <WordDetailModal
        visible={this.state.detailVisible}
        word={this.state.detailWord}
        callback={this._detailCallback.bind(this)} />);
  }

  _getAddWordModal() {
    return (
      <WordAddModal
        visible={this.state.addwordvisible}
        callback={(word) => {this._addwordCallback(word)}}
        word={{word:'', type:'', attested:'', unattested:''}}
      />);
  }

  _getWordEditModal() {
		return (
		  <WordAddModal
      visible={this.state.editWordVisible}
			callback={(word)=>this._editwordCallback(word)}
			word={this.state.editWord}
			isEdit={true}
		  />);
	  }

  _getWordList() {
    return (
      <WordList word={this.state.word}
        user={this.state.user} wordList={this.state.wordList}
        onPressItem={(wordDetail) => this._wordDetailSelectCallback(wordDetail)}
        onLongPressItem={() => { }}
        onEditItem={(word) => { this._onEditWord(word) }}
        onDeleteItem={(word) => { this._onDeleteWord(word) }} />
    );
  }

  render() {
    var addwordmodal = this.state.addwordvisible ? this._getAddWordModal() : null;
    var editwordmodal = this.state.editWordVisible ? this._getWordEditModal() : null;
    var wordDetail = this.state.detailVisible ? this._getWordDetail() : null;
    var wordList = this._getWordList();
    return (
      <View style={styles.containermain}>
        <Titlebar title="Word lookup" />
        <TextInput
          style={styles.textinput}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.state.input = text.toLowerCase().trim()}
          onSubmitEditing={() => { this._onPressButton(); }} />
        <TouchableHighlight
          style={styles.buttonTranslate}
          underlayColor="black"
          onPress={() => { this._onPressButton(); }}>
          <Text style={styles.textTranslate}>
            Translate
          </Text>
        </TouchableHighlight>
        {wordList}
        <Menu callback={(action) => this.handleNavigation(action)} />
        {wordDetail}
        {addwordmodal}
        {editwordmodal}
      </View>
    );
  }
}

AppRegistry.registerComponent('Home', () => Homescreen);
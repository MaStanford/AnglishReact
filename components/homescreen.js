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
import WordDetail from './worddetailmodal';
import AddWordModal from './wordaddmodal';

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
		if (word != null || word != '') {
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

  _WIPAlert(){
    Alert.alert(
			'Feature Incomplete',
			'This feature is no complete yet, I\'m working on getting it done, so keep an eye out for updates',
			[
				{ text: 'OK', onPress: () => { } }
			],
			{ cancelable: false }
		)
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
          onSubmitEditing={() => {this._onPressButton();}} />
        <TouchableHighlight
          style={styles.buttonTranslate}
          underlayColor="black"
          onPress={() => {this._onPressButton();}}>
          <Text style={styles.textTranslate}>
            Translate
          </Text>
        </TouchableHighlight>
        <WordList word={this.state.word} 
          user={this.state.user} wordList={this.state.wordList} 
          onPressItem={(wordDetail)=>this._wordDetailSelectCallback(wordDetail)} 
          onLongPressItem={()=> {this._WIPAlert()}}
          onEditItem={()=> {this._WIPAlert()}}
          onDeleteItem={()=> {this._WIPAlert()}}/>
        <Menu callback={(action) => this.handleNavigation(action)} />
        {wordDetail}
        {addwordmodal}
      </View>
    );
  }
}

AppRegistry.registerComponent('Home', () => Homescreen);
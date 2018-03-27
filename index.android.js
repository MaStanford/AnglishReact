//React imports
import React, { Component } from 'react';
import {
  AppRegistry,
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

export default class Homescreen extends React.Component {
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

  static navigationOptions = {
    title: 'Anglish Wordbook',
  };

  onPressButton() {
    this.setState({word: this.state.input});
    console.log('Button pressed');
  }

  render() {
    console.log('Render');
    const { navigate } = this.props.navigation;    
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
        <Menu callback={(action) => {
            if(action === 'Logout'){
              storage.clear(keys.session);
              storage.clear(keys.user);
              store.dispatch({type:actions.LOGGED_OUT});
            }else{
              navigate(action, { title: action });
            }
          }
        }/>
      </View>
    );
  }
}

//Navigation screens
const AnglishWordbook = StackNavigator({
  Home: {screen: Homescreen},
  Login: {screen: Login }
});

AppRegistry.registerComponent('AnglishWordbook', () => AnglishWordbook);

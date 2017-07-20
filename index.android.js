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
import MenuBuilder from './modules/menubuilder';

//Store
import {store, actions} from './modules/statemanager';

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
      console.log('Store updated');
    });
  }

  static navigationOptions = {
    title: 'Anglish Wordbook',
  };

  onPressButton() {
    this.setState({word: this.state.input});
    this.forceUpdate();
    console.log('Button pressed');
  }

  render() {
    const { navigate } = this.props.navigation;
    let menu = MenuBuilder.build((action) => {
      if(action === 'Logout'){
        store.dispatch({type:actions.LOGGED_OUT});
      }else{
        navigate(action, { title: action });
      }
    });      
    
    return (
      <View style={styles.containermain}>
        <Text>{JSON.stringify(store.getState())}</Text>
        <Titlebar title="Word lookup"/>
        <TextInput
          style={styles.textinput}
          placeholder="Type here to translate!"
          onChangeText= {(text) => this.state.input = text}
          onSubmitEditing = {this.onPressButton.bind(this)}
        />
        <TouchableHighlight 
          style={styles.btn_translate}
          underlayColor="black"
          onPress={this.onPressButton.bind(this)}>
          <Text style={styles.text_translate}>
            Translate
          </Text>
        </TouchableHighlight>
        <ComponentWordList word={this.state.word}/>
        {menu}
      </View>
    );
  }
}

//Navigation screens
const AnglishWordbook = StackNavigator({
  Home: {screen: Homescreen},
  Login: { screen: Login }
});

AppRegistry.registerComponent('AnglishWordbook', () => AnglishWordbook);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Titlebar from './modules/titlebar';
import ComponentWordList from './modules/componentwordlist';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

export default class AnglishWordbook extends Component {
  constructor(props){
    super(props);
    this.state = {
      input:'',
      word:'language'
    }
  }

  onPressButton() {
    this.setState({word: this.state.input});
    this.forceUpdate();
  }

  render() {
    return (
      <View style={styles.container}>
        <Titlebar />
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
        <Text>{this.state.word}</Text>
        <ComponentWordList word={this.state.word}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#c3c4c9',
  },
  instructions: {
    textAlign: 'center',
    color: 'black',
    margin: 10,
  },
  btn_translate: {
    backgroundColor: '#FFFFFF',
    margin: 10,
  },
  text_translate: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    margin: 5
  },
  textinput:{
    height: 40,
    width: '50%',
    textAlign: 'center',
    alignItems: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('AnglishWordbook', () => AnglishWordbook);

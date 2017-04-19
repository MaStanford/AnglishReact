/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import NetworkUtils from './modules/network';
import Titlebar from './modules/titlebar';
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
      word:'',
      response:''
    }
  }

  onPressButton() {
    NetworkUtils.fetchWord(this.state.word)
    .then((res) =>  {
      console.log(res);
      this.setState({response:JSON.stringify(res)});
    }).catch((error) => {
      console.log(error);
      this.setState({response:error.toString});
    });  
  }

  render() {
    return (
      <View style={styles.container}>
        <Titlebar />
        <TextInput
          style={styles.textinput}
          placeholder="Type here to translate!"
          onChangeText= {(text) => this.state.word = text}
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
        <Text style={styles.instructions}>
          {this.state.response}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  btn_translate: {
    backgroundColor: '#FFFFFF',
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
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('AnglishWordbook', () => AnglishWordbook);

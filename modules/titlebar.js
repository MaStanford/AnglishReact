import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';

export default class Titlebar extends Component{
	constructor(props){
		super(props);	
	}
	
	render() {
		return (
			<View style={{backgroundColor: '#9aabd6', width: '100%', height: '10%'}}>
        <Text style={{fontSize: 30, color: 'black', textAlign: 'center',margin: 10, alignItems: 'center'}}>
          Anglish Wordbook
        </Text>
			</View>
		)
	}
}
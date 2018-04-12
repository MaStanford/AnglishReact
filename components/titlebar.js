import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

export default class Titlebar extends Component{
	constructor(props){
		super(props);	
	}
	
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>
					{this.props.title}
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
		height: 40,
		width: '100%',
		backgroundColor: 'white',
	},
	text: {
		fontSize: 20, 
		color: 'black', 
		textAlign: 'center',
		marginTop: 10,
		alignItems: 'center'
	}
});
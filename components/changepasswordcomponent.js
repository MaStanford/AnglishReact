import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from '../modules/styles';
import utils from '../modules/utils';

export default class ChangePasswordComponent extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<Text>This will be how you change password</Text>
		);
	}
}
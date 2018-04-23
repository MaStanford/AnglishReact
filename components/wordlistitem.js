import React, { Component } from 'react';
import {Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';

//Icons https://material.io/icons/
import { Icon } from 'react-native-elements'

import styles from '../modules/styles';

import utils from '../modules/utils';


export default class WordListItem extends React.PureComponent {
	constructor(props){
		super(props);
		this.state ={
			user: props.user,
			word: props.word
		}
	}

	_onPress = () => {
		this.props.onPressItem(this.state.word);
	};

	_onLongPress = () => {
		this.props.onLongPressItem(this.state.word);
	};

	_deleteWord() {
		this.props.onDeleteItem(this.state.word);
	}

	_editWord(){
		this.props.onEditItem(this.state.word);
	}

	_getDeleteButton() {
		return (
			<TouchableHighlight
				style={styles.buttonDeleteWord}
				onPress={() => {
					this._deleteWord();
				}}>
				<Icon name="delete" style={styles.buttonDeleteIcon} />
			</TouchableHighlight>
		);
	}

	_getEditButton() {
		return (
			<TouchableHighlight
				style={styles.buttonDeleteWord}
				onPress={() => {
					this._editWord();
				}}>
				<Icon name="mode-edit" style={styles.buttonDeleteIcon} />
			</TouchableHighlight>
		);
	}

	render() {
		var deleteButton = (this.state.user.permissions >= utils.permissions.mod || this.state.user._id === this.state.word.createdBy) ? this._getDeleteButton() : null;
		var editButton = (this.state.user.permissions >= utils.permissions.mod || this.state.user._id === this.state.word.createdBy) ? this._getEditButton() : null;
		return (
			<TouchableOpacity onPress={this._onPress} onLongPress={this._onLongPress}>
				<View style={{marginTop:3}} key={this.state.word._id}>
					<View style={styles.rowWords}>
						<Text style={styles.textRowLabel}>Word             :</Text>
						<Text style={styles.textdef} selectable={true}>{this.state.word.word}</Text>
					</View>
					<View style={styles.rowWords}>
						<Text style={styles.textRowLabel}>Type              :</Text>
						<Text style={styles.textdef} selectable={true}>{this.state.word.type}</Text>
					</View>
					<View style={styles.rowWords}>
						<Text style={styles.textRowLabel}>Attested       :</Text>
						<Text style={styles.textdef} selectable={true}>{this.state.word.attested.split(',').join('\n').split(';').join('\n')}</Text>
					</View>
					<View style={styles.rowWords}>
						<Text style={styles.textRowLabel}>Unattested  :</Text>
						<Text style={styles.textdef} selectable={true}>{this.state.word.unattested.split(',').join('\n').split(';').join('\n')}</Text>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
						{editButton}
						{deleteButton}
					</View>

				</View>
			</TouchableOpacity>
		);
	}
}

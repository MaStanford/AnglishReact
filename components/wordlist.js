import React, { Component } from 'react';
import {FlatList, Text, View, TouchableOpacity } from 'react-native';

//styles
import styles from '../modules/styles';

//Store
import { store, actions } from '../modules/statemanager'

import WordListItem from './wordlistitem';
import utils from '../modules/utils';

export default class WordList extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			dataSource: props.wordList,
			user: props.user,
			word: props.word
		};

		//Ontouch callback for each item in the list.
		this.onPressItem = props.onPressItem;
	}

	componentWillReceiveProps(props) {
		this.setState({
			dataSource: props.wordList, 
			user: props.user, 
			word: props.word});
	}

	_onPressItem = (word) => {
		this.onPressItem(word);
	};

	_renderItem = ({ item, index }) => (
		<WordListItem
			onPressItem={(item)=>this._onPressItem(item)}
			onLongPressItem={(item) => {this.props.onLongPressItem(item)}}
			onDeleteItem={(item)=>{this.props.onDeleteItem(item)}}
			onEditItem={(item)=>{this.props.onEditItem(item)}}
			word={item}
			user={this.state.user}
		/>
	);

	_renderSeperator = ({ word }) => (
		<View style={{borderBottomWidth:1}}/>
	);

	render() {
		return (
			<View style={styles.containerWordsList}>
				<FlatList
					style={styles.flatListWords}
					data={this.state.dataSource}
					keyExtractor={(item, index) => item._id}
					extraData={this.state.dataSource}
					ListHeaderComponent={() =>
						<Text style={styles.wordlistheader}>
							{this.props.word.toUpperCase()}
						</Text>
					}
					ItemSeparatorComponent={this._renderSeperator}
					renderItem={this._renderItem}
				/>
			</View>
		);
	}
}
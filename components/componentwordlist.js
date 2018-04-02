import React, { Component } from 'react';
import {FlatList, Text, View, TouchableOpacity } from 'react-native';
import NetworkUtils from '../modules/network';

//styles
import styles from '../modules/styles';

//Store
import { store, actions } from '../modules/statemanager'

import WordListItem from './wordlistitem';

export default class FlatListWordList extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			dataSource: this.template
		};

		this.fetchData(props.word); //Just fetch the default word passed in.

		//Ontouch callback for each item in the list.
		this.callback = props.callback;
	}

	template = [{
		key: 'key',
		word: 'word',
		type: 'type',
		attested: 'attested',
		unattested: 'unattested'
	}]

	fetchData(word) {
		if (word != null || word != '') {
			NetworkUtils.fetchWord(word)
				.then((res) => {
					if (res.data.length > 0) {
						this.setState({ dataSource: res.data });
					} else {
						this.setState({ dataSource: this.template });
					}
				}).catch((error) => {
					console.log(error);
				});
		}
	}

	componentWillReceiveProps(props) {
		this.fetchData(props.word);
	}

	_onPressItem = (word) => {
		this.callback(word);
	};

	_renderItem = ({ item, index }) => (
		<WordListItem
			onPressItem={this._onPressItem}
			item={item}
		/>
	);

	_renderSeperator = ({word}) => (
		<Text>--------------------------------------</Text>
	);

	render() {
		return (
			<View style={styles.componentwordlist}>
				<FlatList
					data={this.state.dataSource}
					keyExtractor={(item, index) => index + ',' + item.type + ',' + item.attested}
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
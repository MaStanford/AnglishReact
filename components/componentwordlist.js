import React, { Component } from 'react';
import { AppRegistry, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import NetworkUtils from '../modules/network';

//styles
import styles from '../modules/styles';

//Store
import { store, actions } from '../modules/statemanager'

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
		console.log('wordlist onPress: ' + word.word);
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
							{this.props.word}
						</Text>
					}
					ItemSeparatorComponent={this._renderSeperator}
					renderItem={this._renderItem}
				/>
			</View>
		);
	}
}

class WordListItem extends React.PureComponent {
	_onPress = () => {
		this.props.onPressItem(this.props.item);
	};

	render() {
		return (
			<TouchableOpacity onPress={this._onPress}>
				<View style={styles.containerwordlist} key={this.props.item.key}>
					<View style={styles.row}>
						<Text style={styles.text}>Word            :</Text>
						<Text style={styles.textdef}>{this.props.item.word}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.text}>Type             :</Text>
						<Text style={styles.textdef}>{this.props.item.type}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.text}>Attested      :</Text>
						<Text style={styles.textdef}>{this.props.item.attested.split(',').join('\n')}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.text}>Unattested :</Text>
						<Text style={styles.textdef}>{this.props.item.unattested.split(',').join('\n')}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}
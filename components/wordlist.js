import React, { Component } from 'react';
import {FlatList, Text, View, TouchableOpacity } from 'react-native';
import NetworkUtils from '../modules/network';

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
			dataSource: this.emptyTemplate,
			user: props.user
		};

		if(props.word && !utils.isEmpty(props.word)  && props.word != ''){
			this.fetchData(props.word);
		}

		//Ontouch callback for each item in the list.
		this.callback = props.callback;
	}

	emptyTemplate = [];

	defTemplate = [{
		_id: '_id',
		word: '',
		type: 'N/A',
		attested: 'N/A',
		unattested: 'N/A'
	}]

	fetchData(word = 'language') {
		if (word != null || word != '') {
			NetworkUtils.fetchWord(word, 0)
				.then((res) => {
					if (res.data.length > 0) {
						this.setState({ dataSource: res.data });
					} else {
						var nowordfound = this.defTemplate;
						nowordfound[0].word = this.props.word + ' not found!';
						this.setState({ dataSource: nowordfound });
					}
				}).catch((error) => {
					console.log(error);
				});
		}
	}

	componentWillReceiveProps(props) {
		if(props.word && !utils.isEmpty(props.word)  && props.word != ''){
			this.fetchData(props.word);
		}
		this.setState({user:props.user});
	}

	_onPressItem = (word) => {
		this.callback(word);
	};

	_renderItem = ({ item, index }) => (
		<WordListItem
			onPressItem={(item)=>this._onPressItem(item)}
			onLongPressItem={() => {}}
			onDeleteItem={()=>{}}
			onEditItem={()=>{}}
			word={item}
			user={this.state.user}
		/>
	);

	_renderSeperator = ({word}) => (
		<Text>--------------------------------------</Text>
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
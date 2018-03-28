import React, { Component } from 'react';
import { AppRegistry, FlatList, Text, View, StyleSheet } from 'react-native';
import NetworkUtils from './network';

//styles
import styles from './styles';

//Store
import { store, actions } from './statemanager'

export default class FlatListWordList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataSource: this.template
		};

		this.fetchData(props.word);//Just fetch the default word passed in.
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
						this.setState({ dataSource: res.data});
					} else {
						this.setState({ dataSource: this.template});
					}
				}).catch((error) => {
					console.log(error);
				});
		}
	}

	componentWillReceiveProps(props) {
		this.fetchData(props.word);
	}

	// if(rowID != this.state.dataSource.length){
	// 	console.log(rowID)
	// 	console.log(this.state.dataSource)
	// 	divider = '--------------';
	// }

	render() {
		return (
			<View style={styles.componentwordlist}>
				<Text>
					{this.props.word}
				</Text>
				<FlatList
					data={this.state.dataSource}
					keyExtractor = {(item, index) => index + ',' + item.type + ',' + item.attested}
					extraData = {this.state.dataSource}
					renderItem={({item, index}) => {
						divider = ''
						if(index != this.state.dataSource.length-1){
							divider = '\n-------------------------------\n';
						}
						return (
							<View style={styles.containerwordlist} key={item.key}>
								<View style={styles.row}>
									<Text style={styles.text}>Word</Text>
									<Text style={styles.textdef}>            :{item.word}</Text>
								</View>
								<View style={styles.row}>
									<Text style={styles.text}>Type</Text>
									<Text style={styles.textdef}>             :{item.type}</Text>
								</View>
								<View style={styles.row}>
									<Text style={styles.text}>Attested</Text>
									<Text style={styles.textdef}>      :{item.attested}</Text>
								</View>
								<View style={styles.row}>
									<Text style={styles.text}>Unattested</Text>
									<Text style={styles.textdef}> :{item.unattested}</Text>
								</View>
								<View>
									<Text>{divider}</Text>
								</View>
							</View>
						)
					}
					}
				/>
			</View>
		);
	}
}
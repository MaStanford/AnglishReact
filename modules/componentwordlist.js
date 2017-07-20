import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, StyleSheet } from 'react-native';
import NetworkUtils from './network';

//styles
import styles from './styles';

//Store
import {store, actions} from './statemanager'

export default class ListViewBasics extends Component {
	
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(this.template)
		};
		this.fetchData(props.word);//Just fetch the default word passed in.
	}

	template = [{
		word:'',
		type:'',
		attested:'',
		unattested:''
	}]

	fetchData(word) {
		if(word != null || word != ''){
			NetworkUtils.fetchWord(word)
			.then((res) =>  {
				const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
				this.setState({dataSource: ds.cloneWithRows(res.data)});
			}).catch((error) => {
				console.log(error);
			});
		}
	}

	componentWillReceiveProps(props) {
		this.fetchData(props.word);
	}

	render() {
		return (
		<View style={{flex: 1, paddingTop: 22}}>
			<Text>
				{this.props.word}
			</Text>
			<ListView
			dataSource={this.state.dataSource}
			renderRow={
					(rowData) => 
					<View style={styles.containerwordlist}>
						<View style={styles.row}>						
							<Text style={styles.text}>Word: </Text>
							<Text style={styles.textdef}>{rowData.word}</Text>
						</View>
						<View style={styles.row}>						
							<Text style={styles.text}>Type: </Text>
							<Text style={styles.textdef}>{rowData.type}</Text>
						</View>						
						<View style={styles.row}>						
							<Text style={styles.text}>Attested: </Text>
							<Text style={styles.textdef}>{rowData.attested}</Text>
						</View>						
						<View style={styles.row}>						
							<Text style={styles.text}>Unattested: </Text>
							<Text style={styles.textdef}>{rowData.unattested}</Text>
						</View>					
					</View>
				}
			/>
		</View>
		);
	}
}
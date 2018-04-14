import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import NetworkUtils from '../modules/network';

//styles
import styles from '../modules/styles';

import UserComponent from './usercomponent';

export default class UserList extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			error: '',
			dataSource: this.template
		};
		this.fetchData(props.handle);
		//Ontouch callback for each item in the list.
		this.callback = props.callback;
	}

	template = [{
		_id: '_id',
		handle: '',
		email: '',
		permissions: ''
	}]

	fetchData(handle) {
		return NetworkUtils.getUserByHandle(handle)
			.then((res) => {
				if (res.data.length > 0) {
					this.setState({ dataSource: res.data });
				} else {
					this.setState({ dataSource: this.template });
				}
			}).catch((error) => {
				this.setState({ error: error.message });
			});
	}

	componentWillReceiveProps(props) {
		this.fetchData(props.handle);
	}

	_onPressItem = (user) => {
		this.callback(user);
	};

	_renderItem = ({ item, index }) => (
		<UserComponent
			onPressItem={this._onPressItem}
			user={item}
		/>
	);

	_renderSeperator = ({ word }) => (
		<View style={{borderBottomWidth:1}}/>
	);

	render() {
		return (
			<View style={styles.flatListUsers}>
				<View style={{ flexDirection: 'column', alignContent: 'center' }}>
					<Text ref='error' style={styles.texterror}>
						{this.state.error}
					</Text>

					<Text ref='info' style={styles.textInfo}>
						{this.state.info}
					</Text>
				</View>
				<FlatList
					data={this.state.dataSource}
					keyExtractor={(item, index) => item._id}
					extraData={this.state.dataSource}
					ItemSeparatorComponent={this._renderSeperator}
					renderItem={this._renderItem}
				/>
			</View>
		);
	}
}
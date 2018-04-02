import {
  StyleSheet,
} from 'react-native';

var styles = StyleSheet.create({
	containerwordlist: {
		backgroundColor: 'white',
	},
	componentwordlist: {
		width: '95%',
		backgroundColor: 'white',
		alignItems: 'center',
		borderWidth: 1
	},
	containermain: {
		flex: 1,
		borderWidth: 1,
		alignItems: 'center',
		backgroundColor: '#FFFFFF'
	},
	btn_translate: {
		backgroundColor: '#DCDCDC',
		borderWidth: 1,
		width: 85,
		margin: 10
	},
	text_translate: {
		fontSize: 15,
		color: 'black',
		textAlign: 'center',
		margin: 5
	},
	textinput:{
		height: 40,
		width: '50%',
		textAlign: 'center',
		alignItems: 'center',
		borderWidth: 1,
		margin: 10,
	},
	textinputpassword:{
		height: 40,
		width: '50%',
		borderWidth: 1,
		textAlign: 'center',
		alignItems: 'center',
		margin: 10,
	},
	wordlistheader:{
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 24
	},
	row: {
		flex:1,
		flexDirection: 'row',
		backgroundColor: 'white',
	},
	text: {
		fontWeight: 'bold',
		textAlign: 'right',
		fontSize: 15
	},
	textdef:{
		textAlign: 'left',
		fontSize: 15,
		flexWrap: 'wrap'
	},
	texterror:{
		textAlign: 'left',
		fontSize: 15,
		flexWrap: 'wrap',
		color: 'red'
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	},
	modalBackground: {
		backgroundColor: '#DCDCDC',
		margin: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
	},
	overlay: {
		backgroundColor: '#ff5722',
		borderColor: '#ff5722',
		borderWidth: 1,
		height: 100,
		width: 100,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 20,
		right:20,
		shadowColor: "#000000",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0
		}
	}
});

export {styles as default};
import {
	StyleSheet,
} from 'react-native';

var styles = StyleSheet.create({
	containermain: {
		borderWidth: 1,
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#FFFFFF'
	},
	wordListContainer: {
		width: '90%',
		marginLeft: 5
	},
	wordlist: {
		width: '90%',
		flex: .95,
		backgroundColor: 'white',
		alignItems: 'flex-start',
		borderWidth: 1
	},
	wordRow: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	commentWordlist: {
		width: '90%',
		backgroundColor: 'white',
		alignItems: 'flex-start',
	},
	commentRow: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		flexWrap: 'wrap'
	},
	text: {
		flexDirection: 'row',
		textAlign: 'left',
		fontWeight: 'bold',
		fontSize: 15,
		flexWrap: 'wrap'
	},
	textRowLabel: {
		textAlign: 'left',
		fontWeight: 'bold',
		fontSize: 15,
	},
	textdef: {
		textAlign: 'left',
		fontSize: 15,
		flexWrap: 'wrap'
	},
	wordlistheader: {
		fontWeight: 'bold',
		textAlign: 'left',
		marginLeft: 5,
		fontSize: 24
	},
	commentheadertext: { 
		marginTop: 15, 
		marginBottom: 15, 
		fontSize: 16, 
		fontWeight: 'bold' 
	},
	texterror: {
		textAlign: 'left',
		fontSize: 15,
		flexWrap: 'wrap',
		color: 'red'
	},
	btn_translate: {
		backgroundColor: '#DCDCDC',
		borderWidth: 1,
		width: 85,
		margin: 10
	},
	text_translate: {
		fontSize: 15,
		color: '#000000',
		textAlign: 'center',
		margin: 5
	},
	textinput: {
		height: 40,
		width: '50%',
		textAlign: 'center',
		alignItems: 'center',
		borderWidth: 1,
		margin: 10,
	},
	textinputaddtop: {
		height: 40,
		width: '85%',
		textAlign: 'center',
		alignItems: 'center',
		borderWidth: 1,
		margin: 10,
	},
	textinputaddbot: {
		height: 40,
		width: '70%',
		textAlign: 'center',
		alignItems: 'center',
		borderWidth: 1,
		margin: 10,
	},
	textinputpassword: {
		height: 40,
		width: '50%',
		borderWidth: 1,
		textAlign: 'center',
		alignItems: 'center',
		margin: 10,
	},
	textinputbigedit: {
		height: '45%',
		width: '85%',
		borderWidth: 1,
		textAlign: 'center',
		alignItems: 'center',
		margin: 10,
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 30,
		color: '#FFFFFF',
		alignItems: 'center'
	},
	textinputrowaddwordbutton: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		margin: 10,
	},
	modalBackground: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		marginLeft: 25,
		marginRight: 25,
		marginTop: '18%', 
		marginBottom: '30%',
	},
	modalBackgroundEditText: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		marginLeft: 25,
		marginRight: 25,
		marginTop: '18%', 
		marginBottom: '30%',
	},
	modalBackgroundAddNewWord: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		marginLeft: 25,
		marginRight: 25,
		marginTop: '18%', 
		marginBottom: '30%',
	},
	modalContent: {
		backgroundColor: '#FFFFFF',
		flexDirection: 'column',
		alignItems: 'center'
	},
	modalButton: {
		backgroundColor: '#DCDCDC',
		borderWidth: 1,
		width: 85,
		margin: 10
	},
	modalButtonAddComment: {
		backgroundColor: '#DCDCDC',
		borderWidth: 1,
		width: 100,
		margin: 10
	},
	modalButtonOpenEdit: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		alignItems: 'center',
		width: 40,
		height: 40,
		marginTop: 100
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
		right: 20,
		shadowColor: "#000000",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0
		}
	}
});

export { styles as default };
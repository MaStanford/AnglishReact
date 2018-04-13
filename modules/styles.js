import {
	StyleSheet,
} from 'react-native';

var styles = StyleSheet.create({
	containermain: {
		flex: 1,
		borderWidth: 1,
		alignItems: 'center',
		backgroundColor: '#FFFFFF'
	},
	containerWordsList: {
		flex: 1,
		flexDirection:'row',
		alignItems: 'stretch', //Children cannot have width if you use stretch
		justifyContent: 'center', 
		width: '90%', //You need a width in order to have flex in the children.
		backgroundColor: 'white',
		borderWidth: 1
	},
	flatListWords: {
		width: '90%',
		marginLeft: 5
	},
	rowWords: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		flexWrap: 'wrap'
	},
	flatListComments: {
		flex: 1, //Take up as much space as I can
		flexDirection: 'column', //Everything stacked
		justifyContent: 'center', //Stacked in the middle
		alignItems: 'flex-start', //Aligned from the start of the views
		backgroundColor: 'white',
		marginBottom: 2
	},
	flatListUsers: {
		height: '40%',
		width: '65%',
		backgroundColor: 'white',
		alignItems: 'flex-start',
		borderWidth: 1,
		marginBottom: 2
	},
	rowComments: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		flexWrap: 'wrap'
	},
	rowUsers: {
		flexDirection: 'row',
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
		flexWrap: 'wrap',
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
		fontSize: 24
	},
	textCommentHeader: { 
		marginTop: 7,
		marginBottom: 7,
		fontSize: 16, 
		fontWeight: 'bold' 
	},
	textInfo: {
		textAlign: 'center',
		fontSize: 15,
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	texterror: {
		textAlign: 'center',
		fontSize: 15,
		alignItems: 'center',
		flexWrap: 'wrap',
		color: 'red',
	},
	buttonTranslate: {
		backgroundColor: '#DCDCDC',
		borderWidth: 1,
		width: 85,
		margin: 10
	},
	textTranslate: {
		fontSize: 15,
		color: '#000000',
		textAlign: 'center',
		margin: 5
	},
	textinput: {
		height: 45,
		width: '50%',
		textAlign: 'center',
		alignItems: 'center',
		borderWidth: 1,
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
		height: '55%',
		width: '85%',
		borderWidth: 1,
		textAlign: 'center',
		alignItems: 'center',
		margin: 10,
	},
	textinputrowaddwordbutton: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		margin: 10,
	},
	buttonActionIcon: {
		fontSize: 20,
		height: 30,
		color: '#FFFFFF',
		alignItems: 'center'
	},
	buttonDeleteIcon: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		alignSelf: 'flex-start',
		height: 40,
		width: 40,
		backgroundColor: '#FFFFFF',
		flexWrap: 'wrap',
	},
	containerModalMain: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		marginLeft: 20,
		marginRight: 20,
		marginTop: '18%', 
		marginBottom: '18%',
	},
	containerModalEditTextBackground: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		marginLeft: 20,
		marginRight: 20,
		marginTop: '18%', 
		marginBottom: '18%',
	},
	containerModalAddNewWordBackground: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		marginLeft: 20,
		marginRight: 20,
		marginTop: '18%', 
		marginBottom: '18%',
	},
	containerModalContent: {
		backgroundColor: '#FFFFFF',
		flexDirection: 'column',
		alignItems: 'center'
	},
	buttonModal: {
		backgroundColor: '#DCDCDC',
		borderWidth: 1,
		width: 85,
		margin: 10
	},
	buttonModalAddComment: {
		backgroundColor: '#DCDCDC',
		borderWidth: 1,
		width: 100,
		margin: 10
	},
	buttonModalOpenEdit: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		alignItems: 'center',
		width: 40,
		height: 40,
		marginTop: 100
	},
	buttonSelectPermissions: {
		backgroundColor: '#DCDCDC',
		borderWidth: 1,
		alignItems: 'center',
		width: 100,
		height: 50,
	},
	containerUpdateUserModalButtons:{
		flex: 1,
		flexDirection: 'row',
		width: '95%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		marginLeft: 20,
		marginRight: 20,
	},
	containerModalPickerPermissions:{
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		marginLeft: 20,
		marginRight: 20,
		marginTop: '18%', 
		marginBottom: '18%',
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
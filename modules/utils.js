Utils = {
	isEmpty: function(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop))
				return false;
		}
		return true && JSON.stringify(obj) === JSON.stringify({});
	},
	formatDate: function(date){
		if(this.isEmpty(date) || date == ''){
			return '';
		}
		var uglyDate = new Date(date);
		return uglyDate.toLocaleDateString() + ' ' + uglyDate.toLocaleTimeString();
	}
}

export { Utils as default };
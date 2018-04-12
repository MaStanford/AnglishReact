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
	},
	permissions: {
		'owner'			:99,
		'admin'			:5,
		'mod'			:4,
		'poweruser'		:3,
		'basicuser'		:2,
		'punisheduser'	:1
	}
}

export { Utils as default };
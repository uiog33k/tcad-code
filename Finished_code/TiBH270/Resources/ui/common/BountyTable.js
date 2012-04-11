/*
	Following the model demonstrated in ui/common/ApplicationTabGroup
	create a constructor for the bounty tableview component. This module
	should return an instantiable function (that you'll use with "new").
	It should accept a boolean property to denote whether this table will
	list captured or at-large fugitives.
*/

var BountyTableView = function(/*Boolean*/ _captured) {
	var tv = Ti.UI.createTableView({
		backgroundColor: 'transparent'
	});
		
	function populateData() {
		var db = require('lib/db');
		var results = db.list(_captured);
		tv.setData(results);
	}
	Ti.App.addEventListener('databaseUpdated', populateData);
	
	//run initial query
	populateData();
	
	return tv;
};

module.exports = BountyTableView;
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
		//use dummy data for now...
		var results = [
			{title:'Jeff Haynie', color:'#fff', hasChild:true, captured:_captured},
			{title:'Nolan Wright', color:'#fff', hasChild:true, captured:_captured},
			{title:'Marshall Culpepper', color:'#fff', hasChild:true, captured:_captured},
			{title:'Don Thorp', color:'#fff', hasChild:true, captured:_captured},
			{title:'Blain Hamon', color:'#fff', hasChild:true, captured:_captured}
		];
		tv.setData(results);
	}
	
	//run initial query
	populateData();
	
	return tv;
};

module.exports = BountyTableView;
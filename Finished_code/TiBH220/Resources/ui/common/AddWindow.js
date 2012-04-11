var AddWindow = function() {
	var win = Ti.UI.createWindow({
		title:L('new_fugitive'),
		layout:'vertical',
		barColor: '#6d0a0c',
		backgroundColor: 'transparent',
		backgroundImage: 'images/grain.png'
	});
	
	return win;
};
module.exports = AddWindow;
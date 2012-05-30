var AddWindow = function() {
	var win = Ti.UI.createWindow({
		title:L('new_fugitive'),
		layout:'vertical',
		barColor: '#6d0a0c',
		backgroundColor: 'transparent',
		backgroundImage: 'images/grain.png'
	});

	var tf = Ti.UI.createTextField({
		height:(Ti.Platform.osname==='android') ? Ti.UI.SIZE : 40,
		top:50,
		width:250,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText:L('fugitive_name')
	});
	win.add(tf);

	var save = Ti.UI.createButton({
		title:L('save'),
		height:Ti.UI.SIZE,
		width:80,
		top:10
	});
	save.addEventListener('click', function() {
		var db = require('lib/db');
		db.add(tf.value);
		win.close();
	});
	win.add(save);
	
	return win;
};
module.exports = AddWindow;
function ApplicationTabGroup() {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	var Window = require('ui/handheld/ApplicationWindow');
	
	//create app tabs
	var fugitiveWin = new Window(false),
		capturedWin = new Window(true);
	
	var tab1 = Ti.UI.createTab({
		title: L('fugitives'),
		icon: '/images/fugitives.png',
		window: fugitiveWin
	});
	fugitiveWin.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('captured'),
		icon: '/images/captured.png',
		window: capturedWin
	});
	capturedWin.containingTab = tab2;
	
	self.addTab(tab1);
	self.addTab(tab2);
	
	return self;
};

module.exports = ApplicationTabGroup;

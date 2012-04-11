function ApplicationWindow(/*Boolean*/ _captured) {

	var self = Titanium.UI.createWindow({
		backgroundColor:'transparent',
		backgroundImage: '/images/grain.png',
		title: (_captured) ? L('captured') : L('fugitives'),
		barColor: '#6d0a0c'
	});
	
	return self;
};

module.exports = ApplicationWindow;

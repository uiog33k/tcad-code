var rr = {}; // create our namespace rr = Rss Reader
Ti.include(
	'ui.js',
	'network.js'
);

// call our network function to grab the RSS feed data
rr.net.getRSSData();
// open the app's UI
rr.tabGroup = rr.ui.createAppTabs();
rr.tabGroup.open();
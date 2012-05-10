
AppTabs = function() {
	// Create our tab group and tabs
	var tabGroup = Titanium.UI.createTabGroup();
	
	var RSSWindow = require('ui/RSSWindow');
	var rssWindow = new RSSWindow();
	var AboutWindow = require('ui/AboutWindow');
	var aboutWindow = new AboutWindow();
	
	// Create the RSS reader tab
	var rssTab = Titanium.UI.createTab({  
	    icon:'KS_nav_views.png',
	    title:L('feed'),
	    window:rssWindow
	});
	rssWindow.containingTab = rssTab;
	tabGroup.addTab(rssTab);  

	// Create the About tab
	var aboutTab = Titanium.UI.createTab({  
	    icon:'KS_nav_ui.png',
	    title:L('about'),
	    window:aboutWindow
	});
	AboutWindow.containingTab = aboutTab;
	tabGroup.addTab(aboutTab);

	return tabGroup;
};

module.exports = AppTabs;
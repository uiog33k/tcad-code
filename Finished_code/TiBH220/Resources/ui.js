//Wrap all code in a self-calling function to protect the global namespace
(function() {
	//Create sub-namespace
	bh.ui = {};
	
	//Create the main application tab group
	bh.ui.createApplicationTabGroup = function(_args) {
		var tabs = Ti.UI.createTabGroup();
		
		//for now, just create some simple tabs named how we would want them
		tabs.addTab(Ti.UI.createTab({
			title:L('fugitives'),
			window:Ti.UI.createWindow({
				title:L('fugitives')
			})
		}));
		
		//for now, just create some simple tabs named how we would want them
		tabs.addTab(Ti.UI.createTab({
			title:L('captured'),
			window:Ti.UI.createWindow({
				title:L('captured')
			})
		}));
		
		return tabs;
	};
})();
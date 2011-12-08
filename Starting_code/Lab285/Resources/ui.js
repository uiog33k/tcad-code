(function() {
	rr.ui = {};
	
	rr.ui.createAppTabs = function() {
		// Create our tab group and tabs
		var tabGroup = Titanium.UI.createTabGroup();
		
		// Create the RSS reader tab
		var rssTab = Titanium.UI.createTab({  
		    icon:'KS_nav_views.png',
		    title:'Switched RSS Reader',
		    window:rr.ui.createRSSWindow()
		});
		tabGroup.addTab(rssTab);  

		// Create the About tab
		var aboutTab = Titanium.UI.createTab({  
		    icon:'KS_nav_views.png',
		    title:'About',
		    window:rr.ui.createAboutWindow()
		});
		tabGroup.addTab(aboutTab);

		return tabGroup;
	};
	
	rr.ui.createRSSWindow = function() {
		// Builds the RSS reader window
		var rssWindow = Titanium.UI.createWindow({  
		    title:'',
		    backgroundColor:'#fff'
		});
		// create the tableview
		var tv = Titanium.UI.createTableView();
		rssWindow.add(tv);
		
		// helper function for adding rows, we'll need this later
		rr.ui.addTableRows = function(tblData){
			var tableRows = []; // an array to hold our rows
			for(var i=0; i<tblData.length; i++) {
				tableRows.push(Ti.UI.createTableViewRow({
					title: tblData[i].postTitle,
					color:'black',
					hasChild:true,
					link: tblData[i].postLink
				}));
			}
			tv.setData(tableRows);			
		};
		// add click event listener to open blog post when row is tapped
		tv.addEventListener('click',function(e) {
			// using a modal window on iOS gives us the title bar
			// which we need for the back button
			var webwin = Titanium.UI.createWindow({
				url: 'showweb.js',
				backgroundColor: '#fff',
				myurl: e.rowData.link,
				title:e.rowData.title,
				modal:true
			});
			if(Ti.Platform.osname!='android') {
				// add a close button on iOS
				var btn = Ti.UI.createButton({
					title:'Close'
				});
				btn.addEventListener('click', function(){
					webwin.close();
				})
				webwin.leftNavButton = btn;
			}
			webwin.open();
		});
		// set up an event listener to populate data when it's available from the network
		Ti.App.addEventListener('net:rssDataReturned', function(e){
			// Set the window's title
			rssWindow.title = e.blogTitle;
			// Add the table rows
			rr.ui.addTableRows(e.blogPosts);
		});

		return rssWindow;
	}; // end createRSSWindow()
	
	
	
	rr.ui.createAboutWindow = function() {
		// create the About window
		var aboutWindow = Titanium.UI.createWindow({  
		    title:'About',
		    backgroundColor:'#fff'
		});
		// create the webview, reading in the about.html file
		// we could have used the html property instead, and provided inline HTML content
		var aboutWebView = Titanium.UI.createWebView({  
			url: 'about.html',
			backgroundColor:'#fff'
		});
		aboutWindow.add(aboutWebView);
		return aboutWindow;
	}; // end createAboutWindow();
	
})();

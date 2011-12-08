(function() {
	bh.ui = {};
	
	bh.ui.createAddWindow = function() {
		var win = Ti.UI.createWindow({
			title:L('new_fugitive'),
			layout:'vertical',
			backgroundColor:'#fff'
		});
		
		if (Ti.Platform.osname === 'iphone') {
			var b = Titanium.UI.createButton({
				title:'Close',
				style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
			});
			b.addEventListener('click',function() {
				win.close();
			});
			win.setRightNavButton(b);
		}
		
		return win;
	};
	
	bh.ui.createDetailWindow = function(/*Object*/ _bounty) {
		var win = Ti.UI.createWindow({
			title:_bounty.title,
			layout:'vertical'
		});
		
		win.add(Ti.UI.createLabel({
			text:(_bounty.captured) ? L('busted') : L('still_at_large'),
			top:10,
			textAlign:'center',
			font: {
				fontWeight:'bold',
				fontSize:18
			},
			height:'auto'
		}));
		
		if (!_bounty.captured) {
			var captureButton = Ti.UI.createButton({
				title:L('capture'),
				top:10,
				height:40,
				width:200
			});
			win.add(captureButton);
		}
		
		var deleteButton = Ti.UI.createButton({
			title:L('delete'),
			top:10,
			height:40,
			width:200
		});
		win.add(deleteButton);
		
		return win;
	};
	
	bh.ui.createBountyTableView = function(/*Boolean*/ _captured) {
		var tv = Ti.UI.createTableView();
		
		tv.addEventListener('click', function(_e) {
			var tab = (_captured) ? bh.capturedTab : bh.fugitivesTab;
			tab.open(bh.ui.createDetailWindow(_e.rowData));
		});
		
		function populateData() {
			//use dummy data for now...
			var results = [
				{title:'Jeff Haynie', hasChild:true, captured:false},
				{title:'Nolan Wright', hasChild:true, captured:false},
				{title:'Marshall Culpepper', hasChild:true, captured:true},
				{title:'Don Thorp', hasChild:true, captured:false},
				{title:'Blain Hamon', hasChild:true, captured:true}
			];
			
			tv.setData(results);
		}
		
		populateData();
		
		return tv;
	};
	
	bh.ui.createBountyWindow = function(/*Boolean*/ _captured) {
		var win = Titanium.UI.createWindow({
		  title: (_captured) ? L('captured') : L('fugitives'),
			activity : {
				onCreateOptionsMenu : function(e) {
					var menu = e.menu;
					var m1 = menu.add({ title : L('add') });
					m1.addEventListener('click', function(e) {
						//open in tab group to get free title bar (android)
						var tab = (_captured) ? bh.capturedTab : bh.fugitivesTab;
						tab.open(bh.ui.createAddWindow());
					});
				}
			}
		});
		win.add(bh.ui.createBountyTableView(_captured));
		
		if (Ti.Platform.osname === 'iphone') {
			var b = Titanium.UI.createButton({
				title:L('add'),
				style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
			});
			b.addEventListener('click',function() {
				//open modal on iOS - looks more appropriate
				bh.ui.createAddWindow().open({modal:true});
			});
			win.setRightNavButton(b);
		}
		return win;
	};
	
	bh.ui.createApplicationTabGroup = function() {
		var tabGroup = Titanium.UI.createTabGroup();
		
		var fugitives = bh.ui.createBountyWindow(false);
		var captured = bh.ui.createBountyWindow(true);
		
		bh.fugitivesTab = Titanium.UI.createTab({
		  title: L('fugitives'),
		  window: fugitives
		});
		
		bh.capturedTab = Titanium.UI.createTab({
		  title: L('captured'),
		  window: captured
		});
		
		tabGroup.addTab(bh.fugitivesTab);
		tabGroup.addTab(bh.capturedTab);
		
		return tabGroup;
	};
})();
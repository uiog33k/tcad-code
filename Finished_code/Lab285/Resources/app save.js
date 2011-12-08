var url="http://developer.appcelerator.com/blog/feed";
var WindowWidth = Ti.Platform.displayCaps.platformWidth; 
var WindowHeight = Ti.Platform.displayCaps.platformHeight;
var xhr = Titanium.Network.createHTTPClient();
xhr.open('GET',url);
var data = [];
var WindowWidth = Ti.Platform.displayCaps.platformWidth;
Titanium.UI.setBackgroundColor('#000');


var tabGroup = Titanium.UI.createTabGroup();

var rssWindow = Titanium.UI.createWindow({  
    title:'',
    backgroundColor:'#fff'
});
var rssTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Switched RSS Reader',
    window:rssWindow
});
tabGroup.addTab(rssTab);  

var aboutWindow = Titanium.UI.createWindow({  
    title:'',
    backgroundColor:'#fff'
});

var html_data = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
	html_data += '<html xmlns="http://www.w3.org/1999/xhtml">';
	html_data += '<head>';
	html_data += '<style>';
	html_data += '	body{';
	html_data += ' 		background-color: #ff6427;';
	html_data += ' 		color: #ffffff;';
	html_data += ' 		font-family: sans-serif;';
	html_data += '	}';
	html_data += '	p{';
	html_data += ' 		text-align: center;';
	html_data += ' 		color:#000;';
	html_data += '	}';	
	html_data += '</style>';	
	html_data += '</head>';
	html_data += '<body>';
	html_data += '<p>Switched</p>';
	html_data += '<p>RSS Reader</p>';	
	html_data += '<p id="version">version 0.9.0</p>';
	html_data += '</body>';
	html_data += '</html>';


var aboutWebView = Titanium.UI.createWebView({  
    html:html_data,
		//url: 'about.html',
    backgroundColor:'#fff'
});
aboutWindow.add(aboutWebView);
var aboutTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'About',
    window:aboutWindow
});
tabGroup.addTab(aboutTab);

tabGroup.open();

xhr.onload = function() {
	//Ti.API.info(this.responseText);
	var xml = this.responseXML;
	var channel = xml.documentElement.getElementsByTagName("channel");
	var title = channel.item(0).getElementsByTagName("title").item(0).text;
	rssWindow.title = title;
	var items = xml.documentElement.getElementsByTagName("item");
	for (var i=0;i<items.length;i++) {
		var this_post_title = items.item(i).getElementsByTagName("title").item(0).text;
		var post_link = items.item(i).getElementsByTagName("link").item(0).text;
		var row = Ti.UI.createTableViewRow({height:'auto',width:WindowWidth,top:0,hasChild: true});
		var post_title = Ti.UI.createLabel({
			text: this_post_title,
			textAlign:'left',
			left:0,
			height:50,
			width:'auto',
			top:5,
			bottom: 5,
			color: 'black'
		});	
		row.add(post_title);
		row.link = post_link;
		data.push(row);			
	}
	var tv = Titanium.UI.createTableView({
		data:data,
		top:0,
		width:WindowWidth,
		height:WindowHeight
	});
	rssWindow.add(tv);
	tv.addEventListener('click',function(e) {
		var webwin = Titanium.UI.createWindow({
			url: 'showweb.js',
			backgroundColor: '#fff',
			myurl: e.rowData.link
		});
		rssTab.open(webwin);
	});
};

xhr.send();
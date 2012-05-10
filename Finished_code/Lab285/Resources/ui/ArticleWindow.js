
var ArticleWindow = function(article) {
	var articlewin = Titanium.UI.createWindow({
		backgroundColor: '#fff',
		title:article.title
	});
	var webview = Titanium.UI.createWebView({
		url:article.link
	});
	articlewin.add(webview);
	
	if(Ti.Platform.osname === 'iphone') {
		var c = Ti.UI.createButton({
			title: L('close'),
			style: Ti.UI.iPhone.SystemButtonStyle.PLAIN
		});
		c.addEventListener('click', function(){
			articlewin.close();
		});
		articlewin.setLeftNavButton(c);
		
	}

	return articlewin;
}

module.exports = ArticleWindow;
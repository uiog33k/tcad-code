/*
	UI component: Message composition & submission window
*/

exports.messageWindow = function(bountyname, photo) {
	var lWin = Ti.UI.createWindow({
		/* full-screen view provides modal veil	*/
		backgroundColor: '#333',
		title: L('messages')
	});
	if(Ti.Platform.osname=='iphone') {
		var c = Ti.UI.createButton({
				title:L('close'),
				style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
			});
			c.addEventListener('click',function() {
				lWin.close();
			});
			lWin.setLeftNavButton(c);
	}
	var lwDialog = Ti.UI.createView({
		/* the dialog itself */
		top: 20,
		width: '300dp',
		height: '300dp',
		borderWidth: 2,
		borderRadius: 6,
		borderColor: '#ddd',
		backgroundColor: '#999',
		layout:'vertical'
	});
	// now rig up its contents
	var message = Ti.UI.createTextArea({
		value:L('message') + bountyname + '!',
		top:5,
		width: '90%',
		height: '60%',
		font: {
			fontWeight: 'normal',
			fontSize: '16'
		},
		textAlign: 'left',
		color: '#333',
		backgroundColor: '#eee',
		borderRadius: 3
	});
	lwDialog.add(message);
	var submitButton = Ti.UI.createButton({
		title:L('brag'),
		top: 15,
		width: 200,
		height: Ti.UI.SIZE
	});
	function cb(loggedIn) {
		if(loggedIn===true) {
			alert('message posted!');
			lWin.close();
		} else {
			alert('message failed');
			submitButton.title = L('brag');
			submitButton.enabled = true;
		}
	}
	submitButton.addEventListener('click', function() {
		submitButton.title = L('pleasewait');
		submitButton.enabled = false;
		var acs = require('lib/acs');
		acs.brag(message.value, photo, cb);
	});
	lwDialog.add(submitButton);
	
	var sv = Ti.UI.createScrollView({
		width: '100%',
		height: '100%'
	});
	// finally, add the dialog view to the veil view
	sv.add(lwDialog);

	lWin.addEventListener('click', function() {
		for(var i=0, j=lwDialog.children.length; i<j; i++) {
			try {
				lwDialog.children[i].blur();
			} catch(err) { }
		}
	});

	lWin.add(sv);
	// and return the whole mess
	return lWin;
};

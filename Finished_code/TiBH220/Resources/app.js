(function() {
	Ti.API.info('Welcome to TiBountyHunter for ' + Ti.Platform.osname);
	
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	new ApplicationTabGroup().open();
})();

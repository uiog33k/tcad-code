/*
	Library to wrap app-specific functionality around the ACS APIs
*/
// a couple local variables to save state
var currentUser = null;
var loggedIn = false;

// add your ACS keys here:
var Cloud = require('ti.cloud');
Cloud.apiKey = 'CUxRdZRwGEbdLE1bPYOJ7YPYLRT23rZm';
Cloud.consumerKey = 'r7F9M13DcezDlMpBIVvY1XKnWt5qB1n8';
Cloud.consumerSecret = 'FOplU7RXyhmXKonixUEkfEwagx4ypazN';

exports.isLoggedIn = function() {
	return loggedIn;
};

exports.login = function(username, password, callback) {
	Cloud.Users.login({
	    login: username,
	    password: password
	}, function (e) {
	    if (e.success) {
	    	currentUser = e.users[0];
	    	loggedIn = true;
			callback(loggedIn);
	    } else {
	        Ti.API.info('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	        loggedIn = false;
	        currentUser = null;
			callback(loggedIn);
	    }
	});	
};

exports.logout = function() {
	Cloud.Users.logout(function (e) {
	    if (e.success) {
	        currentUser = null;
	        loggedIn = false;
	    }
	});		
};

exports.createUser = function(username, password, callback) {
	// ACS API requires password & confirm, but we do the checking elsewhere so use the same for both here
	Cloud.Users.create({
		username: username,
		password: password,
		password_confirmation: password
	}, function (e) {
	    if (e.success) {
	        Ti.API.info('user = ' + JSON.stringify(e.users[0]))
	        currentUser = e.users[0];
	        loggedIn = true;
	        callback(currentUser);
	    } else {
	    	Ti.API.info('Error' + JSON.stringify(e));
	    	loggedIn = false;
	    	currentUser = null;
	    	callback(false);
	    }
	});
};

exports.brag = function(message, photo, callback) {
	if(loggedIn) {
		Cloud.Statuses.create({
		    message: message,
		    photo: photo
		}, function (e) {
		    if (e.success) {
		        callback(true);
		    } else {
		        Ti.API.info('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		        callback(false);
		    }
		});	
	} else {
		return false;
	}
};

exports.getBragList = function(callback) {
	if(loggedIn) {
		Cloud.Statuses.search({
		    user_id: currentUser.id
		}, function (e) {
		    if (e.success) {
		    	Ti.API.info('statuses = ' + JSON.stringify(e.statuses))
		    	callback(e.statuses);
		    } else {
		        Ti.API.info('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		        callback(false);
		    }
		});
	}
};
/*
	Library to wrap app-specific functionality around the ACS APIs
*/
// a couple local variables to save state
var currentUser = null;
var loggedIn = false;

var Cloud = require('ti.cloud');
// make sure you added your ACS keys to the tiapp.xml file!


exports.isLoggedIn = function() {
	return loggedIn;
};

exports.login = function(username, password, callback) {
/*
 * Write a function that will use the ACS Users API to log in a user.
 *   - upon successful login, set currentUser equal to the user object returned by ACS
 *   - and set loggedIn=true. Then, call the callback function, passing the loggedIn variable
 *   - if login fails, write the error message to the console, set loggedIn=false and currentUser=null
 *   - then call the callback function passing the loggedIn variable
 */
};

exports.logout = function() {
/*
 * Write a function that will use the ACS Users API to log out the current user
 *   - on success, set currentUser=null and loggedIn=false
 */
};

exports.createUser = function(username, password, callback) {
/*
 * Write a function that will use the ACS Users API to create a user with the given name & password
 *   - on success, set currentUser equal to the user object returned by ACS and set
 *   - loggedIn=true, then call the callback function passing the current user.
 *   - on failure, log a message to the console, set loggedIn to false, current user to null
 *   - and call the callback function, passing false
 */
};

exports.brag = function(message, photo, callback) {
/*
 * Write a function that will use the ACS Statuses API to post a message for the logged in user
 *   - pass a message and a photo, no other params are needed
 *   - on success, call the callback function passing true
 *   - on failure, log the error to the console, call callback() passing false
*/
};

exports.getBragList = function(callback) {
/*
 * Write a function that will use the ACS Statuses API to retrieve a list of messages for the logged in user
 *   - on success, call the callback function, passing the array of status messages returned by ACS
 *   - on failure, log the error and call callback() passing false
*/
};
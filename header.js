var generalUpdater = {
	updateUserLink: function(username) {
		console.log("updating user link to: " + username);
    	$('section:nth-child(1) #username').html("<a class='external' href='" + "http://www.github.com/" + username + "'>" + username + "</a>");
	},

	updateUsername: function(callback) {
		username = "";
	    chrome.storage.local.get('username', function (result) {
	    	if (result.username==null) { // 'get' failed
	          	username = "octocat";
	      	} else {
	      		username = result.username;
	    	}
	    	callback(username);
			return username;
	  });
	}
}

$(document).ready(function() {
	generalUpdater.updateUsername(generalUpdater.updateUserLink);
});
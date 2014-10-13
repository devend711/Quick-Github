// Saves options to chrome.storage
function save_options() {
  var username = $("input#username").val();
  chrome.storage.local.set({
    'username': username
  }, function() {
    // Update status to let user know options were saved.
    console.log('saved it');
  });
}

$(document).ready(function() {
  chrome.storage.local.get('username', function (result) {
    $("input#username").attr("value", result.username);
  });

  $("#back-icon").click(function() {
    console.log('saving!');
    save_options();
    generalUpdater.updateUsername(generalUpdater.updateUserLink);
  });
});


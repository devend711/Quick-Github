var BASE_URL = "https://api.github.com" 
var NUM_RECENT = 3

var githubManager = {

   getAllUserRepos: function() {
    var result = "";
    $.ajax({
            type:"GET",
            beforeSend: function (request) {
                  request.setRequestHeader("Accept", "application/vnd.github.v3+json");
              },
            url: BASE_URL + "/users/" + username + "/repos?sort=pushed&type=all",
            dataType: 'json',
            async: false,
            success: function(data) {
                result = data;
            }
    });
    return result;
   },

   showRepos: function() {
    data = this.getAllUserRepos();
    // show the count of repos, make it a link to the page of all repositories
    $('#repo-count').text("All " + data.length).wrap("<a class='external' href='" + "http://github.com" + "/" + username + "/repositories" + "'></a>" );

    toList = data.slice(0,NUM_RECENT);
    box = $('#repos');
    if (toList.length > 0) {
      $.each(toList, function(index, value) {
        box.append("<li><a class='external' href='" + value['html_url'] + "'>" + value['name'] +"</a></li>")
      });
    } else {
      box.append("None to show");
    }
   }
};

$(document).ready(function () {
  generalUpdater.updateUsername(function(name){
    username = name;
    githubManager.showRepos();
  });

  // open links in a new tab
  $('body').on('click', 'a.external', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});


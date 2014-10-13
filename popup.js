// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */

var BASE_URL = "https://api.github.com" 
var USERNAME = "devend711"

var githubManager = {
   getAllUserRepos: function() {
    var result = "";
    $.ajax({
            type:"GET",
            beforeSend: function (request) {
                  request.setRequestHeader("Accept", "application/vnd.github.v3+json");
              },
            url: BASE_URL + "/users/" + USERNAME + "/repos?sort=pushed&type=all",
            dataType: 'json',
            async: false,
            success: function(data) {
                console.log("success!");
                result = data;
            }
    });
    return result;
   },

   updateGeneral: function() {
    $('section#top').append(USERNAME);
   },

   showRepos: function() {
    data = this.getAllUserRepos().slice(0,3);

    box = $('#repos');
    $.each(data, function(index, value) {
      box.append("<div><a href='" + value['html_url'] + "'>" + value['name'] +"</a></div>")
    });
   }
};

// Run our kitten generation script as soon as the document's DOM is ready.
$(document).ready(function () {

  $('a#all-repos').attr("href","http://github.com" + "/" + USERNAME + "/repositories");

  // open links in a new tab
  $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });

  githubManager.showRepos();
  githubManager.updateGeneral();
});

// JSON-P Stack overflow fetcher for Octopress
// (c) Frederick Cheung // MIT License

/* Sky Slavin, Ludopoli. MIT license.  * based on JavaScript Pretty Date * Copyright (c) 2008 John Resig (jquery.com) * Licensed under the MIT license.  */
function stackOverflowPrettyDate(time) {
  if (navigator.appName === 'Microsoft Internet Explorer') {
    return "<span>&infin;</span>"; // because IE date parsing isn't fun.
  }
  var say = {
    just_now:    " now",
    minute_ago:  "1m",
    minutes_ago: "m",
    hour_ago:    "1h",
    hours_ago:   "h",
    yesterday:   "1d",
    days_ago:    "d",
    last_week:   "1w",
    weeks_ago:   "w"
  };

  var current_date = new Date(),
      current_date_time = current_date.getTime(),
      current_date_full = current_date_time + (1 * 60000),
      date = new Date(time),
      diff = ((current_date_full - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0) { return "<span>&infin;</span>"; }

  return day_diff === 0 && (
    diff < 60 && say.just_now ||
    diff < 120 && say.minute_ago ||
    diff < 3600 && Math.floor(diff / 60) + say.minutes_ago ||
    diff < 7200 && say.hour_ago ||
    diff < 86400 && Math.floor(diff / 3600) + say.hours_ago) ||
    day_diff === 1 && say.yesterday ||
    day_diff < 7 && day_diff + say.days_ago ||
    day_diff === 7 && say.last_week ||
    day_diff > 7 && Math.ceil(day_diff / 7) + say.weeks_ago;
}

function showStackoverflowFeed(data, user) {
  var timeline = document.getElementById('stackoverflow'),
      content = '';

  for (var i = 0; i < data.items.length; i++) {
      content += '<li>'+'<p>'+ '<span>'+stackOverflowPrettyDate(data.items[i].creation_date*1000)+'</span><a href="http://stackoverflow.com/a/' + data.items[i].answer_id +'/' +user + '">' + data.items[i].title + '</a></p></li>';
  }
  timeline.innerHTML = content;
}

function getStackOverflowFeed(user, count) {
  count = parseInt(count, 10);
  var url = 'http://api.stackexchange.com/2.0/users/' + user + '/answers?pagesize=' + count + '&order=desc&sort=creation&site=stackoverflow&filter=!9g(zI9ACQ&callback=?';
  $.ajax({
      url: url,
      type: 'jsonp',
      error: function (err) { $('#stack li.loading').addClass('error').text("Stack Overflow's busted"); },
      success: function(data) { showStackoverflowFeed(data, user); }
  })
}

function getFuzzy(timestamp) {
  var delta = Math.round((+new Date() - new Date(timestamp)) / 1000);

  var minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7,
    month = week * 4,
    year = month * 12,
    decade = year * 10,
    century = decade * 10;

  var fuzzy;

  if (delta < 30) {
    fuzzy = "now";
  } else if (delta < minute) {
    fuzzy = delta + " seconds ago";
  } else if (delta < 2 * minute) {
    fuzzy = "a minute ago";
  } else if (delta < hour) {
    fuzzy = Math.floor(delta / minute) + " minutes ago";
  } else if (Math.floor(delta / hour) == 1) {
    fuzzy = "1 hour ago";
  } else if (delta < day) {
    fuzzy = Math.floor(delta / hour) + " hours ago";
  } else if (delta < month) {
    fuzzy = Math.floor(delta / week) + " weeks ago";
  } else if (delta < year) {
    fuzzy = Math.floor(delta / month) + " months ago";
  } else if (delta < decade) {
    fuzzy = Math.floor(delta / year) + " years ago";
  } else if (delta < century) {
    fuzzy = Math.floor(delta / decade) + " decades ago";
  } else if (delta < day * 2) {
    fuzzy = "yesterday";
  } else {
    fuzzy = new Date(timestamp).toLocaleDateString();
  }
  return fuzzy;
}

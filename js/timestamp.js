function getFuzzy(timestamp) {
  var delta = Math.round((+new Date() - new Date(timestamp)) / 1000);

  var minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;

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
  } else if (delta < day * 2) {
    fuzzy = "yesterday";
  } else {
    fuzzy = new Date(timestamp).toLocaleDateString();
  }
  return fuzzy;
}

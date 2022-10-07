var stylesheet = document.querySelector('link[href="/css/dark.css"]')

var storage = {}
storage.getItem = function(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
storage.setItem = function(name, info) {
  if (!info) {
    document.cookie = name+"="+info+"; expires=Thu, 18 Dec 0001 12:00:00 UTC";
  } else {
  document.cookie = name+"="+info+"; expires=Thu, 18 Dec 9999 12:00:00 UTC";
  }
}
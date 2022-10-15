function getBadges(user, element) {
  var data = user
  const badges = {
    "active":"🔥",
    "moderator":"🛡️",
    "writer":"✍️",
    "developer":"🧑‍💻",
    "admin": "👑"
  }
  Object.keys(badges).forEach(function(el) {
    if (data[el]) {
    var span = document.createElement('span')
    span.className = 'badge'
    span.dataset.badgeType = el
      span.textContent = badges[el]
      element.appendChild(twemoji.parse(span))
    }
  })
}
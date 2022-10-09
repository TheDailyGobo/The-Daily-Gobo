async function getBadges(user, element) {
  var response = await fetch('/users/'+user+'/')
  var data = await response.json()
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
      element.appendChild(span)
    }
  })
}
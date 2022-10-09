var input = document.createElement('input')
input.type = 'text'
input.placeholder = 'username'
var btn1 = document.createElement('button')
btn1.addEventListener('click', async function() {
  var response = await fetch('/writer/'+document.querySelector('input').value+'/')
  var data = await response.json()
  alert(data.status)
})
btn1.textContent = 'writer'
var btn2 = document.createElement('button')
btn2.addEventListener('click', async function() {
  var response = await fetch('/mod/'+document.querySelector('input').value+'/')
  var data = await response.json()
  alert(data.status)
})
btn2.textContent = 'mod'
var div = document.createElement('div')
div.appendChild(input)
div.appendChild(btn1)
div.appendChild(btn2)

document.querySelector('#view').appendChild(createBox({title:"Admin Panel", content:div}))
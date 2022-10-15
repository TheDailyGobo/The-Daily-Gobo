let cdn = document.createElement("script");
cdn.src = "https://twemoji.maxcdn.com/v/latest/twemoji.min.js";
cdn.textContent = `
  twemoji.parse(document.body);
`
document.querySelector('body').appendChild(cdn)
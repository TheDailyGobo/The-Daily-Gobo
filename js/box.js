function createBox(data) {
  if (data.title && data.content) {
    var div = document.createElement("div");
    div.className = "box";
    var content = document.createElement("div");
    content.className = "box-content";
    content.appendChild(data.content);
    var header = document.createElement("div");
    header.className = "box-header";
    var h4 = document.createElement("h4");
    h4.textContent = data.title;
    header.appendChild(h4);
    div.appendChild(header);
    div.appendChild(content);
    return div;
  } else {
    return undefined;
  }
}

var input = document.createElement("input");
input.type = "text";
input.placeholder = "username";
var btn1 = document.createElement("button");
btn1.addEventListener("click", async function () {
  var response = await fetch(
    "/writer/" + document.querySelector("input").value + "/"
  );
  var data = await response.json();
  alert(data.status);
});
btn1.textContent = "writer";
var btn2 = document.createElement("button");
btn2.addEventListener("click", async function () {
  var response = await fetch(
    "/mod/" + document.querySelector("input").value + "/"
  );
  var data = await response.json();
  alert(data.status);
});
btn2.textContent = "mod";
var btn3 = document.createElement("button");
btn3.addEventListener("click", async function () {
  var reason = prompt("what is the warning for?");
  if (reason) {
    var data = { user: document.querySelector("input").value, warning: reason };
    var response = await fetch("/warn/", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    var data = await response.text();
    alert("complete");
  } else {
    alert("cancelled");
  }
});
btn3.textContent = "warn";
var div = document.createElement("div");
div.appendChild(input);
div.appendChild(btn1);
div.appendChild(btn2);
div.appendChild(btn3);

document
  .querySelector("#view")
  .appendChild(createBox({ title: "Admin Panel", content: div }));

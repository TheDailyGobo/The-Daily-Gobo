// database
const Database = require("@replit/database")
const db = new Database()

// everything else
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const express = require('express')
const request = require('request');
const linkify = require("linkifyjs");
const linkifyHtml = require("linkify-html");
const { crypto } = require('crypto')
const options = { defaultProtocol: "https", formatHref: {
    mention: (href) => "https://postit.gantzos.com/users" + href,
  } };
require("linkify-plugin-mention")
const path = require('path');
const DOMPurify = require('isomorphic-dompurify');
const cloudinary = require('cloudinary')
const jsonfile = require('jsonfile');
var bodyParser = require('body-parser')
const busboy = require('busboy');
var cors = require('cors')
var jsonParser = bodyParser.json();
const cookieParser = require('cookie-parser');
function parseCookies(request) {
  const list = {};
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function(cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
}
app = express();
const PORT = 3000;
app.use(cookieParser())
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/html/index.html'));
})

app.get('/verify', function(req, res) {
  var redirectLocation = new Buffer('https://thedailygobo.scratchtools.app/verified').toString('base64');
res.redirect(`https://auth.itinerary.eu.org/auth/?redirect=${redirectLocation}&name=The Daily Gobo`);
})

app.get('/verified', async function(req, res) {
  const { privateCode } = req.query;
  fetch(`https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`, { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
        // The `data` object sent by Scratch Auth will contain notably a `valid` property and a `username` property
        // If `valid` is `true`, the user has successfully completed authentication process
        if (data.valid === true) {
            // Generate a session document for the user and store it in the database
          res.send(data.username)
        } else {
            // Respond to the client with an error
            res.status(403).json({ error: 'Authentication failed' });
        }
    });
})

app.listen(PORT, function (){
    console.log('Listening on Port 3000');
});
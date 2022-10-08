// database
const Database = require("@replit/database")
const db = new Database()
const allowedToWrite = ['NFlex23', 'rgantzos', 'MaterArc', 'AugieDoggie2011', 'jboys846', 'relativity-', '2022dev19', 'TheAnvils','UnofficialSDS','Virtual-Insanity','kittiemasters']
const allowedToMod = ['rgantzos', 'MaterArc', 'TheAnvils', 
'kittiemasters']
const headMembers = ['MaterArc', 'rgantzos']

// writing files
const fs = require("fs");
//db.set("tokens", {})

// discord webhook
const { WebhookClient, EmbedBuilder } = require('discord.js')
const client = new WebhookClient({url:"https://discord.com/api/webhooks/1028030025246703726/uZUvifQVy6xDXLaOkkirhIgJrMecYpOkJXHAly_2LgOSWvIZrPJM_y_7aR1wg05UIRC3"})


// keeping online
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
async function keepOnline() {
  var response = await fetch('https://thedailygobo.scratchtools.app/keeponline/')
  var data = await response.json()
}

setInterval(keepOnline, 10000)


function getCookie(name, req) {
  const value = `; ${req.headers.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

async function writePost(post, author) {
  //await db.set("posts", {})
  var posts = await db.get("posts")
  var postId = Object.keys(posts).length.toString()
  posts[postId] = {"time":Date.now(), "author":author, "loves":[], "favorites":[]}
  db.set("posts", posts)
  var writeStream = fs.createWriteStream("posts/post"+postId+".md");
  writeStream.write(post);
  writeStream.end();
  var embed = new EmbedBuilder()
  .setTitle(`New post by ${author}`)
  .setColor('Random')
  .setDescription(post)
  .setTimestamp()
  var response = await fetch('https://trampoline.turbowarp.org/proxy/users/'+author)
  var data = await response.json()
  embed.setAuthor({name:author, iconURL:data.profile.images['90x90'], url:"https://scratch.mit.edu/users/"+author+"/"})
  client.send({
	username: 'The Daily Gobo',
	avatarURL: 'https://cdn.discordapp.com/icons/1026288031537303563/a1e8c8448b80ea612a13dd238e4609a4.webp?size=240',
	embeds: [embed],
});
  return postId
}

// everything else
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

app.get('/keeponline/', function(req, res) {
  res.send({"ok":true})
})

app.get('/users/:username/', async function(req, res) {
  var response = await fetch('https://trampoline.turbowarp.org/proxy/users/'+req.params.username)
  if (response.ok) {
    var data = await response.json()
    if (!data.error) {
      var username = data.username
      var postsThisWeek = 0
      var posts = await db.get("posts")
      Object.keys(posts).forEach(function(el) {
        if (posts[el].author === username) {
      var then = new Date(posts[el].time);
var now = new Date();

var msBetweenDates = Math.abs(then.getTime() - now.getTime());

// 👇️ convert ms to days                 hour   min  sec   ms
var daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

if (daysBetweenDates < 7) {
  postsThisWeek = postsThisWeek+1
}
        }
    })
      res.send({"username":username,"writer":(allowedToWrite.includes(username)),"moderator":(allowedToMod.includes(username)),"active":(postsThisWeek > 2)})
    }
  }
})

app.get('/post/:post/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
    var posts = await db.get("posts")
    if (posts[req.params.post]) {
      res.render(__dirname + "/html/post.html", {username:tokens[getCookie('usertoken', req)],post:req.params.post})
    } else {
      res.sendStatus(400)
    }
  } else {
    res.redirect("https://thedailygobo.scratchtools.app/verify/")
  }
})

app.get('/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
    res.redirect("https://thedailygobo.scratchtools.app/feed/")
  } else {
    res.sendFile(path.join(__dirname, '/html/index.html'));
  }
})

app.get('/logout/', function(req, res) {
  res.cookie('usertoken','abc', { maxAge: 0, httpOnly: true });
  res.send("ok")
})

app.get('/favorite/:post/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
      var user = tokens[getCookie('usertoken', req)]
      var posts = await db.get("posts")
    if (posts[req.params.post]) {
      if (posts[req.params.post].favorites.includes(user)) {
        var newFavorites = []
        posts[req.params.post].favorites.forEach(function(el) {
          if (el !== user) {
            newFavorites.push(el)
          }
        })
        posts[req.params.post].favorites = newFavorites
        await db.set("posts", posts)
        res.send(posts[req.params.post].favorites)
      } else {
        posts[req.params.post].favorites.push(user)
        await db.set("posts", posts)
        res.send(posts[req.params.post].favorites)
      }
    } else {
      res.sendStatus(400)
    }
  } else {
    res.sendStatus(400)
  }
})

app.get('/love/:post/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
      var user = tokens[getCookie('usertoken', req)]
      var posts = await db.get("posts")
    if (posts[req.params.post]) {
      if (posts[req.params.post].loves.includes(user)) {
        var newLoves = []
        posts[req.params.post].loves.forEach(function(el) {
          if (el !== user) {
            newLoves.push(el)
          }
        })
        posts[req.params.post].loves = newLoves
        await db.set("posts", posts)
        res.send(posts[req.params.post].loves)
      } else {
        posts[req.params.post].loves.push(user)
        await db.set("posts", posts)
        res.send(posts[req.params.post].loves)
      }
    } else {
      res.sendStatus(400)
    }
  } else {
    res.sendStatus(400)
  }
})

app.post('/newblogpost/', jsonParser, async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
      var user = tokens[getCookie('usertoken', req)]
    if (allowedToWrite.includes(user)) {
      if (req.body.content) {
        var post = await writePost(req.body.content, user)
        res.send(post)
      } else {
        res.sendStatus(400)
      }
    } else {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(403)
  }
})

app.get('/getmod/:user/', async function(req, res) {
  if (allowedToMod.includes(req.params.user)) {
    res.send({"mod":true,"writer":(allowedToWrite.includes(req.params.user))})
  } else {
    res.send({"mod":false,"writer":(allowedToWrite.includes(req.params.user))})
  }
})

app.get('/delete/:post/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
      var user = tokens[getCookie('usertoken', req)]
    if (allowedToMod.includes(user)) {
      var posts = await db.get("posts")
      if (posts[req.params.post]) {
        posts[req.params.post] = {"deleted":true}
        await db.set("posts", posts)
        res.sendStatus(200)
      } else {
        res.sendStatus(400)
      }
    } else {
      res.sendStatus(403)
    }
  }
})

app.get('/dashboard/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
      var user = tokens[getCookie('usertoken', req)]
    if (allowedToWrite.includes(user)) {
        res.sendFile(path.join(__dirname, '/html/dashboard.html'));
    } else {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(403)
  }
})

app.get('/verify', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
              res.redirect("https://thedailygobo.scratchtools.app/feed/")
  } else {
  var redirectLocation = new Buffer('https://thedailygobo.scratchtools.app/verified').toString('base64');
res.redirect(`https://auth.itinerary.eu.org/auth/?redirect=${redirectLocation}&name=The Daily Gobo`);
  }
})

app.get('/feed/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
    var messages = await db.get("messages")
    if (messages[tokens[getCookie('usertoken', req)]]) {
      var messagesForYou = JSON.stringify(messages[tokens[getCookie('usertoken')]])
    } else {
      var messagesForYou = "[]"
    }
              res.render(__dirname + "/html/feed.html", {username:tokens[getCookie('usertoken', req)], messages:messagesForYou})
  } else {
    res.redirect("https://thedailygobo.scratchtools.app/verify/")
  }
})

app.get('/posts/', async function(req, res) {
  var posts = await db.get("posts")
  Object.keys(posts).forEach(function(el) {
    if (posts[el].deleted) {
      delete posts[el]
    }
  })
  res.send(posts)
})

app.get('/verified', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
              res.redirect("https://thedailygobo.scratchtools.app/feed/")
  } else {
  const { privateCode } = req.query;
  fetch(`https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`, { method: 'GET' })
    .then((response) => response.json())
    .then(async function(data) {
        // The `data` object sent by Scratch Auth will contain notably a `valid` property and a `username` property
        // If `valid` is `true`, the user has successfully completed authentication process
        if (data.valid === true) {
            // Generate a session document for the user and store it in the database
          var tokens = await db.get("tokens")
          var token = makeid(200)
          tokens[token] = data.username
          await db.set("tokens", tokens)
          res.cookie('usertoken',token, { maxAge: 999999999900000, httpOnly: true });
          res.redirect("https://thedailygobo.scratchtools.app/feed/")
        } else {
            // Respond to the client with an error
            res.status(403).json({ error: 'Authentication failed' });
        }
    });
  }
})

app.listen(PORT, function (){
    console.log('Listening on Port 3000');
});
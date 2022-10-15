// database
const Database = require("@replit/database")
const db = new Database()
//const allowedToWrite = ['NFlex23', 'rgantzos', 'MaterArc', 'AugieDoggie2011', 'jboys846', 'relativity-', '2022dev19', 'TheAnvils','UnofficialSDS','Virtual-Insanity','kittiemasters', 'popjam12', 'WhatijStudios', 'BendyOl183', 'Blueper_Scratch', 'kawaiinessdog', 'elip100', 'coolcreator200_alt', 'ST36_Programmer', 'BlixerEvolution', 'sinktheshot', 'Taurus7d', 'Marie_Chibi', ' IloveSpeedy6', '-lxvelydaises-', '-FunnyToons-', 'ZeldaFan_78', 'diethon', 'RoseReef', 'ZeldaFan_78']
//const allowedToMod = ['rgantzos', 'MaterArc', 'TheAnvils', 'kittiemasters', 'AugieDoggie2011', 'WhatijStudios','-FunnyToons-', 'jask82006', 'RoseReef']
const headMembers = ['MaterArc', 'rgantzos','-RabbitWorld-', 'popjam12']
const developers = ['rgantzos', 'MaterArc', 'TheAnvils', 'applejuiceproduc']
const banned = ['']
const postsPerWeekForActive = 3

async function addMoreLikes() {
  var posts = await db.get("posts")
  posts["271"].loves = ['NFlex23', 'rgantzos', 'MaterArc', 'AugieDoggie2011', 'jboys846', 'relativity-', '2022dev19', 'TheAnvils','UnofficialSDS','Virtual-Insanity','kittiemasters', 'popjam12', 'WhatijStudios', 'BendyOl183', 'Blueper_Scratch', 'kawaiinessdog', 'elip100', 'coolcreator200_alt', 'ST36_Programmer', 'BlixerEvolution', 'sinktheshot', 'Taurus7d', 'Marie_Chibi', ' IloveSpeedy6', '-lxvelydaises-', '-FunnyToons-', 'ZeldaFan_78', 'diethon', 'RoseReef', 'ZeldaFan_78']
  posts["271"].favorites = ['NFlex23', 'rgantzos', 'MaterArc', 'AugieDoggie2011', 'jboys846', 'relativity-', '2022dev19', 'TheAnvils','UnofficialSDS','Virtual-Insanity','kittiemasters', 'popjam12', 'WhatijStudios', 'BendyOl183', 'Blueper_Scratch', 'kawaiinessdog', 'elip100', 'coolcreator200_alt', 'ST36_Programmer', 'BlixerEvolution', 'sinktheshot', 'Taurus7d', 'Marie_Chibi', ' IloveSpeedy6', '-lxvelydaises-', '-FunnyToons-', 'ZeldaFan_78', 'diethon', 'RoseReef', 'ZeldaFan_78']
  await db.set("posts", posts)
}
//addMoreLikes()

async function testMessages() {
  var messages = await db.get("messages")
  console.log(messages)
}
testMessages()

async function banTheBanned() {
  var tokens = await db.get("tokens")
  Object.keys(tokens).forEach(function(el) {
    if (banned.includes(tokens[el])) {
      tokens[el] = undefined
    }
  })
  await db.set("tokens", tokens)
}
banTheBanned()

// writing files
const fs = require("fs");
//db.set("tokens", {})

// discord webhook
const { WebhookClient, EmbedBuilder } = require('discord.js')
const client = new WebhookClient({url:process.env.webhook})
const deletePostClient = new WebhookClient({url:process.env.deletePost})


// keeping online
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


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

function getUserData(username, posts, allowedToWrite, allowedToMod) {
      var postsThisWeek = 0
      var totalLoves = 0
      var totalFavorites = 0
      var totalPosts = 0
      Object.keys(posts).forEach(function(el) {
        if (posts[el].author === username) {
          if (!posts[el].deleted) {
            totalPosts = totalPosts+1
            totalLoves = totalLoves+posts[el].loves.length
            totalFavorites = totalFavorites+posts[el].favorites.length
      var then = new Date(posts[el].time);
var now = new Date();

var msBetweenDates = Math.abs(then.getTime() - now.getTime());

// 👇️ convert ms to days                 hour   min  sec   ms
var daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

if (daysBetweenDates < 7) {
  postsThisWeek = postsThisWeek+1
}
        }
        }
    })
      return {"username":username,"writer":(allowedToWrite.includes(username)),"moderator":(allowedToMod.includes(username)),"active":(postsThisWeek > (postsPerWeekForActive-1)),"developer":(developers.includes(username)),"admin":(headMembers.includes(username)),"stats":{"loves":totalLoves,"favorites":totalFavorites,"posts":totalPosts}}
}

async function getFeatured() {
  var posts = await db.get("posts")
  var currentLargest = {"loves":-1,"favorites":-1}
  var idOfCurrentLargest = '-1'
  Object.keys(posts).forEach(function(el) {
    if (!posts[el].deleted) {
    var then = new Date(posts[el].time);
var now = new Date();

var msBetweenDates = Math.abs(then.getTime() - now.getTime());

// 👇️ convert ms to days                 hour   min  sec   ms
var daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

if (daysBetweenDates < 1) {
  if (!((currentLargest.loves+(currentLargest.favorites*2)) < (posts[el].loves+(posts[el].favorites*2)))) {
    currentLargest = posts[el]
    idOfCurrentLargest = el
  }
}
    }
  })
  currentLargest.id = idOfCurrentLargest
  return currentLargest
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
  var str = post
  if(str.length > 10) str = str.substring(0,4096);
  var embed = new EmbedBuilder()
  .setTitle(`New post by ${author}`)
  .setColor('Random')
  .setDescription(str)
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
const showdown  = require('showdown')
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

app.get('/messages/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
    var user = tokens[getCookie('usertoken', req)]
    var messages = await db.get("messages")
    if (messages[user]) {
      res.send(messages[user])
    } else {
      res.send([])
    }
  }
})

app.get('/writers/', async function(req, res) {
  var writers = await db.get("allowedToWrite")
  res.send(writers)
})

app.get('/clear/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
    var user = tokens[getCookie('usertoken', req)]
    var messages = await db.get("messages")
    if (messages[user]) {
      messages[user] = []
      await db.set("messages", messages)
      res.sendStatus(200)
    }
  }
})

app.get('/js/head-member.js', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
    if (headMembers.includes(tokens[getCookie('usertoken', req)])) {
res.sendFile(path.join(__dirname, '/js/head-member.js'));
    } else {
      res.send("")
    }
  } else {
    res.send("")
  }
})

app.use(cookieParser())
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/featured/', async function(req, res) {
  var featured = await getFeatured()
  res.send(featured)
})

app.get('/writer/:user/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
    if (headMembers.includes(tokens[getCookie('usertoken', req)])) {
      var mods = await db.get("allowedToWrite")
      var response = await fetch('https://trampoline.turbowarp.org/proxy/users/'+req.params.user)
      var data = await response.json()
      if (data.username) {
      if (mods.includes(data.username)) {
        var newMods = []
        mods.forEach(function(el) {
          if (el !== data.username) {
            newMods.push(el)
          }
        })
        await db.set("allowedToWrite", newMods)
        res.send({"status":"removed writer"})
      } else {
        mods.push(data.username)
        await db.set("allowedToWrite", mods)
        res.send({"status":"gave writer"})
      }
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

app.get('/mod/:user/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
    if (headMembers.includes(tokens[getCookie('usertoken', req)])) {
      var mods = await db.get("allowedToMod")
      var response = await fetch('https://trampoline.turbowarp.org/proxy/users/'+req.params.user)
      var data = await response.json()
      if (data.username) {
      if (mods.includes(data.username)) {
        var newMods = []
        mods.forEach(function(el) {
          if (el !== data.username) {
            newMods.push(el)
          }
        })
        await db.set("allowedToMod", newMods)
        res.send({"status":"removed mod"})
      } else {
        mods.push(data.username)
        await db.set("allowedToMod", mods)
        res.send({"status":"gave mod"})
      }
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

app.get('/uncensor/:post/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
    if (headMembers.includes(tokens[getCookie('usertoken', req)])) {
      var posts = await db.get("posts")
      if (posts[req.params.post]) {
        posts[req.params.post].deleted = undefined
        await db.set("posts", posts)
        res.send({"success":true})
      } else {
        res.sendStatus(400)
      }
    }  else {
    res.sendStatus(403)
  }
    
  } else {
    res.sendStatus(403)
  }
})

app.get('/users/:username/', async function(req, res) {
  const allowedToWrite = await db.get("allowedToWrite")
  const allowedToMod = await db.get("allowedToMod")
  var response = await fetch('https://trampoline.turbowarp.org/proxy/users/'+req.params.username)
  if (response.ok) {
    var data = await response.json()
    if (!data.error) {
      var username = data.username
      var postsThisWeek = 0
      var totalLoves = 0
      var totalFavorites = 0
      var totalPosts = 0
      var posts = await db.get("posts")
      Object.keys(posts).forEach(function(el) {
        if (posts[el].author === username) {
          if (!posts[el].deleted) {
            totalPosts = totalPosts+1
            totalLoves = totalLoves+posts[el].loves.length
            totalFavorites = totalFavorites+posts[el].favorites.length
      var then = new Date(posts[el].time);
var now = new Date();

var msBetweenDates = Math.abs(then.getTime() - now.getTime());

// 👇️ convert ms to days                 hour   min  sec   ms
var daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

if (daysBetweenDates < 7) {
  postsThisWeek = postsThisWeek+1
}
        }
        }
    })
      res.send({"username":username,"writer":(allowedToWrite.includes(username)),"moderator":(allowedToMod.includes(username)),"active":(postsThisWeek > (postsPerWeekForActive-1)),"developer":(developers.includes(username)),"admin":(headMembers.includes(username)),"stats":{"loves":totalLoves,"favorites":totalFavorites,"posts":totalPosts}})
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

app.get('/users/', async function(req, res) {
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
    var user = tokens[getCookie('usertoken', req)]
  if (headMembers.includes(user)) {
    var users = []
    Object.keys(tokens).forEach(function(el) {
      if (!users.includes(tokens[el])) {
      users.push(tokens[el])
      }
    })
    res.send({"count":users.length, "users":users})
  } else {
    res.sendStatus(403)
  }
  } else {
    res.sendStatus(403)
  }
})

app.post('/warn/', jsonParser, async function(req, res) {
  const messages = await db.get("messages")
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
      var user = tokens[getCookie('usertoken', req)]
    if (headMembers.includes(user)) {
      if (req.body.user && req.body.warning) {
        var response = await fetch('https://trampoline.turbowarp.org/proxy/users/'+req.body.user)
        var data = await response.json()
        if (data.username) {
          var username = data.username
          if (messages[username]) {
        messages[username].push(`New admin message: `+req.body.warning)
          } else {
            messages[username] = [`New admin message: `+req.body.warning]
          }
        await db.set("messages", messages)
        res.sendStatus(200)
        deletePostClient.send({
    content: `@${user} just warned @${username}: `+"`"+req.body.warning+"`",
	username: 'The Daily Gobo',
	avatarURL: 'https://cdn.discordapp.com/icons/1026288031537303563/a1e8c8448b80ea612a13dd238e4609a4.webp?size=240'
});
        }
      }
    }
  }
})

app.post('/newblogpost/', jsonParser, async function(req, res) {
  const allowedToWrite = await db.get("allowedToWrite")
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
      var user = tokens[getCookie('usertoken', req)]
    if (allowedToWrite.includes(user)) {
      if (req.body.content) {
        if (req.body.content.length > 50) {
        var post = await writePost(req.body.content, user)
        res.send(post)
        } else {
          res.sendStatus(400)
        }
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
  const allowedToWrite = await db.get("allowedToWrite")
  const allowedToMod = await db.get("allowedToMod")
  if (allowedToMod.includes(req.params.user)) {
    res.send({"mod":true,"writer":(allowedToWrite.includes(req.params.user))})
  } else {
    res.send({"mod":false,"writer":(allowedToWrite.includes(req.params.user))})
  }
})

app.get('/uncensored/', async function(req, res) {
  const allowedToMod = await db.get("allowedToMod")
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
      var user = tokens[getCookie('usertoken', req)]
    if (allowedToMod.includes(user)) {
  var posts = await db.get("posts")
  res.send(posts)
    } else {
    res.sendStatus(403)
  }
  } else {
    res.sendStatus(403)
  }
})

app.get('/delete/:post/', async function(req, res) {
  const allowedToMod = await db.get("allowedToMod")
  var tokens = await db.get("tokens")
  if (getCookie('usertoken', req) && Object.keys(tokens).includes(getCookie('usertoken', req))) {
      var user = tokens[getCookie('usertoken', req)]
    if (allowedToMod.includes(user)) {
      var posts = await db.get("posts")
      if (posts[req.params.post]) {
        posts[req.params.post].deleted = user

        var embed = new EmbedBuilder()
  .setTitle(`Post Deleted by ${user}`)
  .setColor('Random')
  .setTimestamp()
  var response = await fetch('https://trampoline.turbowarp.org/proxy/users/'+user)
  var data = await response.json()
  embed.setAuthor({name:user, iconURL:data.profile.images['90x90'], url:"https://scratch.mit.edu/users/"+user+"/"})
  deletePostClient.send({
    content: `@${user} just deleted post #${req.params.post} by @${posts[req.params.post].author}.`,
	username: 'The Daily Gobo',
	avatarURL: 'https://cdn.discordapp.com/icons/1026288031537303563/a1e8c8448b80ea612a13dd238e4609a4.webp?size=240',
	embeds: [embed],
});
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
  const allowedToWrite = await db.get("allowedToWrite")
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
              res.render(__dirname + "/html/feed.html", {username:tokens[getCookie('usertoken', req)]})
  } else {
    res.redirect("https://thedailygobo.scratchtools.app/verify/")
  }
})

app.get('/postinfo/:post/', async function(req, res) {
  var posts = await db.get("posts")
  if (posts[req.params.post]) {
  res.send(posts[req.params.post])
  } else {
    res.sendStatus(404)
  }
})

app.get('/posts/:post/', async function(req, res) {
  fs.readFile(__dirname + "/posts/"+req.params.post+".md", function(err, data) {
  var converter = new showdown.Converter()
    var text = data.toString('utf8')
  var html = converter.makeHtml(text)
          html = DOMPurify.sanitize(html, {ALLOWED_TAGS: ['b', 'q', 'a', 'i', 'ul', 'li', 'img', 'ol', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'br', 'u'], ALLOWED_ATTR: ['src', 'href']})
  res.send(html)
  })
})

app.get('/posts/', async function(req, res) {
  if (req.query.offset && !isNaN(req.query.offset)) {
  const allowedToWrite = await db.get("allowedToWrite")
  const allowedToMod = await db.get("allowedToMod")
  var featured = await getFeatured()
  var posts = await db.get("posts")
  var newPosts = {}
  var trendingPost = {"loves":[],"favorites":[]}
  var trendingPostId = "-1"
  Object.keys(posts).forEach(function(el, i) {
    if ((Object.keys(posts).length-i) > Number(req.query.offset)-1 && (Object.keys(posts).length-i) < Number(req.query.offset)+50) {
    if (!posts[el].deleted) {
      var then = new Date(posts[el].time);
var now = new Date();

var msBetweenDates = Math.abs(then.getTime() - now.getTime());

// 👇️ convert ms to days                 hour   min  sec   ms
var daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

if (daysBetweenDates < 1) {

      if ((posts[el].loves.length+(posts[el].favorites.length*2)) > (trendingPost.loves.length+(trendingPost.favorites.length*2))) {
        trendingPost = posts[el]
        trendingPostId = el
      }
}
      posts[el].author = getUserData(posts[el].author, posts, allowedToWrite, allowedToMod)
      newPosts[el] = posts[el]
    }
          }
  })
  if (newPosts[trendingPostId]) {
  newPosts[trendingPostId].featured = true
  }
  res.send(newPosts)
  } else {
    res.sendStatus(400)
  }
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
          if (!banned.includes(data.username)) {
          tokens[token] = data.username
          await db.set("tokens", tokens)
          res.cookie('usertoken',token, { maxAge: 999999999900000, httpOnly: true });
          res.redirect("https://thedailygobo.scratchtools.app/feed/")
          } else {
            res.send("oops you're banned")
          }
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
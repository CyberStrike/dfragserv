// index.js
var express = require("express");
var logfmt = require("logfmt");
var Pusher = require("pusher");
var debug = require('debug')('http')
var app = express();

var pusher = new Pusher({
    appId: '61730',
    key: 'ab3c98158c6fe5aeb9cd',
    secret: 'e8e70748d47475f9b50d'
});

app.use(express.json());
app.use(express.urlencoded());
app.use(logfmt.requestLogger());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();

})

//index

app.get('/', function(req, res) {
  res.send('Hello World!');

  pusher.trigger(
    'players',
    'my_event', {
      "message": "hello world"
      });
});

//auth

app.post('/auth', function(req, res) {
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var channelData = {user_id: '1', user_info: { name: 'Ash Ketchum', twitter_id: '@pusher'}};
    var auth = pusher.auth(socketId, channel, channelData);
    res.send( auth );
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

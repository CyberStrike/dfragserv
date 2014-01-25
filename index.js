// index.js
var express = require("express");
var logfmt = require("logfmt");
var Pusher = require("pusher");
var app = express();

var pusher = new Pusher({
    appId: '61730',
    key: 'ab3c98158c6fe5aeb9cd',
    secret: 'e8e70748d47475f9b50d'
});


app.use( logfmt.requestLogger() );
app.use( express.bodyParser() );


app.get('/', function(req, res) {
  res.send('Hello World!');

  pusher.trigger(
    'players',
    'my_event', {
      "message": "hello world"
      });
});

app.post('/auth', function(req, res) {
    var channelData = {
        user_id: '1',
        user_info: {
            name: 'Ash Ketchum',
            twitter_id: '@leggetter'
        }
    };
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;

    var auth = pusher.auth(socketId, channel, channelData);

    res.send( auth );
    console.log(socketId, channel, channelData, auth);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

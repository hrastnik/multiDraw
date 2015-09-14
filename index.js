var app = require("express")();
http = require('http').Server(app);
var io = require("socket.io")(http);
var fs = require('fs');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    fs.readFile('main.html', function(err, data) {
        res.send(data.toString());
    });
});

io.on("connection", function(s) {
    s.on('m', function(msg) {s.broadcast.emit('m', msg);});
    s.on('s', function(line_id) {s.broadcast.emit('s', line_id);});
});

http.listen(app.get('port'));
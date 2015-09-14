var app = require("express")();
http = require('http').Server(app);
var io = require("socket.io")(http);
var fs = require('fs');

app.get('/', function(req, res) {
    fs.readFile('main.html', function(err, data) {
        res.send(data.toString());
    });
});

io.on("connection", function(s) {
    s.on('d', function(coords) {io.emit('d', coords);});
    s.on('m', function(coords) {io.emit('m', coords);});
    s.on('u', function(coords) {io.emit('u', coords);});    
});

http.listen(8000);
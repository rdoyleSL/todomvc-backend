var util = require('util'),
	finalhandler = require('finalhandler'),
    http = require('http'),
	serveStatic = require('serve-static'),
	port = 9000;

var serve = serveStatic('./');
var server = http.createServer(function(req, res) {
	var done = finalhandler(req, res);
	serve(req, res, done);
});

server.listen(port);

util.puts('Listening on ' + port + '...');
util.puts('Press Ctrl + C to stop.');
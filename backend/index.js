var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/',(req, res) => {
	res.send('<h1>Hello World!</h1>');
});

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.emit("FROMAPI", "Hello there sir!");

	socket.on('disconnect', () => {
		console.log('user disconnected');
	  });
});

http.listen(3001, () => {
	console.log('Listening on *:3001');
});

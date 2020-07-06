var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on("new message", (message) => {
		io.emit("new message", message)
	});

	socket.on('user typing', () => {
		io.emit('user typing','user is typing');
	})

	socket.on('stop typing', () => {
		io.emit('stop typing', 'no typing');
	})

	socket.on('disconnect', () => {
		console.log('user disconnected');
	  });
});

http.listen(3001, () => {
	console.log('Listening on *:3001');
});

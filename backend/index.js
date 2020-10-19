
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const usersRouter = require('./routes/Users');
const workspacesRouter = require('./routes/Workspaces');

require('dotenv').config();
require('dotenv').config({path: '/Users/richardchaidez/Documents/webProjects/react/chat-app/backend/.env.development.local'});
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const uri = "mongodb://mongo:27017/chatapp";
const io = socketIO(server);

app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.use('/workspace',workspacesRouter);

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on("join room", (room) => {
		socket.join(room, () => {
			socket.in(room).emit("new message", "Testing new room");
		});
	});

	socket.on("leave room", (room) => {
		socket.leave(room);
	})

	socket.on("new message", (data) => {
		socket.to(data.room).emit("new message", data.message)
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


mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

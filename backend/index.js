
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/Users');
const workspacesRouter = require('./routes/Workspaces');
const messagesRouter = require('./routes/Messages');

require('dotenv').config();
require('dotenv').config({path: '/Users/richardchaidez/Documents/webProjects/react/chat-app/backend/.env.development.local'});
const app = express();
app.use(cors());
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const uri = "mongodb://mongo:27017/chatapp";
const io = socketIO(server);

app.use(express.json());
app.use('/users', usersRouter);
app.use('/workspace',workspacesRouter);
app.use('/messages', messagesRouter);

io.on('connection', (socket) => {
	socket.join("Public");
	//should only join room once
	socket.on("join room", (userRoom) => {
		socket.join(userRoom.room, (err) => {
			if(err) console.log(err);

			const joinRoomMessage ={
				primary: userRoom.room,
				secondary: `${userRoom.user} joined ${userRoom.room}`
			};
			socket.broadcast.to(userRoom.room).emit("new message", joinRoomMessage);
		});
	});

	socket.on("leave room", (room) => {
		socket.leave(room);
	})

	socket.on("new message", (data) => {
		const roomMessage = {
			primary: data.user,
			secondary: data.message
		}
		socket.to(data.room).emit("new message", roomMessage)
	});

	socket.on('user typing', () => {
		console.log("user is typing");
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

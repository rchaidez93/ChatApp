
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

require('dotenv').config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
const io = socketIO(server);

app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);

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


mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

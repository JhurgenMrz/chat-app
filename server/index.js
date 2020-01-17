const express = require("express");
const { join } = require('path')
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const { addUser, getUser, getUsersInRoom, removeUser } = require("./user");

const PORT = process.env.PORT || 5000;
const app = express();

const router = require("./router");

const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(join(__dirname, 'build')))


io.on("connection", socket => {
	socket.on("join", ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });
		console.log(user);
		if (error) return callback(error);

		socket.emit("message", {
			user: "admin",
			text: `${name}, welcome to the room ${user.room}`
		});
		socket.broadcast
			.to(user.room)
			.emit("message", {
				user: "admin",
				text: `${name.toLowerCase()}, has joined`
			});

		socket.join(user.room);

		io.to(user.room).emit("roomData", {
			room: user.room,
			users: getUsersInRoom(user.room)
		});

		callback();
	});

	socket.on("sendMessage", (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit("message", { user: user.name, text: message });
		io.to(user.room).emit("roomData", {
			room: user.room,
			users: getUsersInRoom(user.room)
		});

		callback();
	});

	socket.on("disconnect", () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit("message", {
				user: "admin",
				text: `${user.name} has left.`
			});
		}
		console.log("User had left!");
	});
});

// app.use(router);

app.get('/*', (req,res)=>{
    res.status(200).sendFile(join(__dirname,'build','index.html'))
})

server.listen(PORT, () => {
	console.log(`Server has started on port http://localhost:${PORT}`);
});

const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { text } = require("stream/consumers");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};
const rooms = {};

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile(path.resolve("./public/index.html"));
});

io.on("connection", (socket) => {
  let currentRoom = null;

  // function to Set username
  socket.on("set-username", (username, callback) => {
    if (users[username]) {
      callback(false);
    } else {
      users[username] = socket.id;
      socket.username = username;
      callback(true);
    }
  });

  // function of Create a new room
  socket.on("create-room", (roomName) => {
    if (!rooms[roomName]) {
      rooms[roomName] = [];
      io.emit("room-list", Object.keys(rooms));
    }
  });

  // function for Join a existing room
  socket.on("join-room", (roomName) => {
    if (rooms[roomName]) {
      currentRoom = roomName;
      rooms[roomName].push(socket.username);
      socket.join(roomName);
      io.to(roomName).emit("join-message", `${username} has joined the room.`);
      io.emit("room-list", Object.keys(rooms));
    }
  });

  // function of user messages
  socket.on("user-message", (message) => {
    if (currentRoom) {
      const timestamp = new Date().toLocaleTimeString();
      io.to(currentRoom).emit("message", {
        username: socket.username,
        message: `${message} [${timestamp}]`,
      });
    }
  });

  // function for user disconnect
  socket.on("disconnect", () => {
    if (currentRoom) {
      rooms[currentRoom] = rooms[currentRoom].filter(
        (user) => user !== socket.username
      );
      io.to(currentRoom).emit(
        "join-message",
        `${socket.username} has left the room.`
      );
      if (rooms[currentRoom].length === 0) {
        delete rooms[currentRoom];
        io.emit("room-list", Object.keys(rooms));
      }
    }
    delete users[socket.username];
  });
});

server.listen(9500, () =>
  console.log("server started at http://localhost:9500")
);

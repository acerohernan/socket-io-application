const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const uuid = require("uuid");

let notes = [];

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

//midlewares
app.use(cors());
app.use(express.json());

//static
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.emit("server:loadnotes", notes);

  socket.on("client:newnote", ({ title, description }) => {
    const newNote = {
      title,
      description,
      id: uuid.v4(),
    };
    notes.push(newNote);
    io.emit("server:newnote", newNote);
  });

  socket.on("client:getnote", (noteId) => {
    note = notes.find((note) => note.id === noteId);
    socket.emit("server:selectednote", note);
  });

  socket.on("client:deletenote", (noteId) => {
    notes = notes.filter((note) => note.id !== noteId);
    io.emit("server:loadnotes", notes);
  });

  socket.on("client:updatenote", (newNote) => {
    notes = notes.map((note) => {
      if (note.id === newNote.id) {
        note.title = newNote.title;
        note.description = newNote.description;
      }
      return note;
    });
    io.emit("server:loadnotes", notes);
  });
});

server.listen(3000, () => {
  console.log("Server is listening in port: 3000");
});

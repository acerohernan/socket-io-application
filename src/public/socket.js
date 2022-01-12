const socket = io();

const saveNote = (title, description) => {
  socket.emit("client:newnote", { title, description });
};

const getNote = (noteId) => {
  socket.emit("client:getnote", noteId);
};

const updateNote = (id, title, description) => {
  socket.emit("client:updatenote", { id, title, description });
};

const deleteNote = (noteId) => {
  socket.emit("client:deletenote", noteId);
};

socket.on("server:newnote", (note) => {
  appendNote(note);
});

socket.on("server:loadnotes", renderNotes);

socket.on("server:selectednote", selectNote);

const notesContainer = document.querySelector("#notes");

let selectedId;

const uiNote = (note) => {
  const div = document.createElement("div");

  div.innerHTML = `
        <div class="card card-body rounded-0 mb-2">
            <div class="d-flex justify-content-between">
                <h1 class="h3">${note.title}</h1>
                <div>
                    <button class="btn btn-danger delete" data-id="${note.id}">Delete</button>
                    <button class="btn btn-secondary update" data-id="${note.id}">Update</button>
                </div>
            </div>
            <p class="">${note.description}</p>
        </div>
    `;

  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () => deleteNote(btnDelete.dataset.id));
  btnUpdate.addEventListener("click", () => getNote(btnUpdate.dataset.id));

  return div;
};

const renderNotes = (notes) => {
  notesContainer.innerHTML = "";
  notes.map((note) => notesContainer.append(uiNote(note)));
};

const appendNote = (note) => notesContainer.append(uiNote(note));

const selectNote = (note) => {
  const titleInput = document.querySelector("#title");
  const descriptionInput = document.querySelector("#description");

  titleInput.value = note.title;
  descriptionInput.value = note.description;

  selectedId = note.id;
};

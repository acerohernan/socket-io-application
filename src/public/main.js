const noteForm = document.querySelector("#noteForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (selectedId) updateNote(selectedId, title.value, description.value);

  if (!selectedId) saveNote(title.value, description.value);

  selectedId = null;
  title.value = "";
  description.value = "";

  title.focus();
});

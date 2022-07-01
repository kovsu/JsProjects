const container = document.querySelector(".notes__container-2");
const addBtn = document.querySelector(".notes__btn-add");

function getAllNotes() {
  const notes = localStorage.getItem("notes");
  return notes === null ? "[]" : notes;
}

function getIdFromLs() {
  const id = localStorage.getItem("ids");
  console.log(id);
  if (id === null) {
    localStorage.setItem("ids", 0);
    return 0;
  }
  localStorage.setItem("ids", parseInt(id) + 1);
  return parseInt(id) + 1;
}

function addNotes() {
  const notes = JSON.parse(getAllNotes());
  localStorage.setItem(
    "notes",
    JSON.stringify([
      ...notes,
      {
        id: getIdFromLs(),
        content: "",
      },
    ])
  );
  renderAllNotes();
}

function getNote(id) {
  const notes = JSON.parse(getAllNotes());
  const note = notes.filter((note) => note.id === id);
  return note;
}

function saveNoteContent(id, content) {
  const notes = JSON.parse(getAllNotes());
  const note = notes.filter((note) => note.id === id);
  localStorage.setItem(
    "notes",
    JSON.stringify([
      ...notes.filter((note) => note.id !== id),
      {
        id,
        content,
      },
    ])
  );
}

function deleteNote(id) {
  const notes = JSON.parse(getAllNotes());
  localStorage.setItem(
    "notes",
    JSON.stringify(notes.filter((note) => note.id !== id))
  );
  renderAllNotes();
}

addBtn.addEventListener("click", () => {
  addNotes();
});

function renderNote(note) {
  let item = document.createElement("div");
  item.classList.add("notes__item");
  item.innerHTML = `
  <header class="notes__header">
    <button class="notes__btn notes__btn-search">
      <i class="fa fa-magnifying-glass"></i>
    </button>
    <button class="notes__btn notes__btn-write">
      <i class="fa fa-pen-to-square"></i>
    </button>
    <button class="notes__btn notes__btn-delete">
      <i class="fa fa-trash-can"></i>
    </button>
  </header>
  <section class="notes__content">
    <p>
     ${note.content}
    </p>
    <textarea class="notes__textarea hidden"></textarea>
  </section>
`;

  const header = item.querySelector(".notes__header");
  const searchBtn = item.querySelector(".notes__btn-search");
  const editBtn = item.querySelector(".notes__btn-write");
  const deleteBtn = item.querySelector(".notes__btn-delete");
  const textArea = item.querySelector(".notes__textarea");
  const content = item.querySelector(".notes__content p");

  searchBtn.addEventListener("click", () => {
    header.classList.toggle("active");
  });

  deleteBtn.addEventListener("click", () => {
    deleteNote(note.id);
  });

  editBtn.addEventListener("click", () => {
    if (textArea.classList.contains("hidden")) {
      console.log(note.id);
      const noteContent = getNote(note.id).content;
      console.log(noteContent);
      textArea.innerHTML = noteContent;
    } else {
      const nowContent = textArea.value;
      saveNoteContent(note.id, nowContent);
      content.innerHTML = nowContent;
    }

    textArea.classList.toggle("hidden");
    content.classList.toggle("hidden");
  });

  container.appendChild(item);
}

function renderAllNotes() {
  container.innerHTML = "";
  const notes = JSON.parse(getAllNotes());
  notes.forEach((note) => {
    renderNote(note);
  });
}

renderAllNotes();

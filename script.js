const addNoteBtn = document.getElementById("addNote");
const noteInput = document.getElementById("noteInput");
const colorPicker = document.getElementById("colorPicker");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchInput");
const toggleTheme = document.getElementById("toggleTheme");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note";
    div.style.background = `linear-gradient(135deg, ${note.color}80, ${note.color}40)`;
    div.innerHTML = `
      <p>${note.text}</p>
      <button class="delete">&times;</button>
    `;
    div.querySelector(".delete").addEventListener("click", () => {
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    });
    notesContainer.appendChild(div);
  });
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

addNoteBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();
  if (text) {
   notes.push({ text, color: selectedColor });

    saveNotes();
    renderNotes();
    noteInput.value = "";
  }
});

searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".note").forEach(note => {
    const content = note.querySelector("p").textContent.toLowerCase();
    note.style.display = content.includes(term) ? "block" : "none";
  });
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const icon = toggleTheme.querySelector("i");
  if (document.body.classList.contains("dark")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});


// Initial render
renderNotes();

let selectedColor = '#ff9a9e';

const pickr = Pickr.create({
  el: '#colorPicker',
  theme: 'classic', // or 'monolith', 'nano'
  default: selectedColor,
  components: {
    preview: true,
    opacity: true,
    hue: true,

    interaction: {
      hex: true,
      rgba: true,
      input: true,
      clear: false,
      save: true
    }
  }
});

pickr.on('save', (color) => {
  selectedColor = color.toHEXA().toString();
  pickr.hide();
});

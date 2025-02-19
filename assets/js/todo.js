let activeTodoCount = document.querySelector(".activeTodoCount");
let todos = [];
let id = 0;
let activeTodoCounter = 0;

if (localStorage.todos) {
  todos = JSON.parse(localStorage.todos);
  renderTodos();
  addData.disabled = true;
}  else {
  addData.disabled = false;
}

if (localStorage.id) {
  id = Number(localStorage.id);
}

function generateId() {
  id++;
  localStorage.id = id;
  return id;
}

addData.addEventListener("click", function () {
  todos = [
    ...todos,
    {
      id: 1,
      todo: "Kitap oku",
    },
    {
      id: 2,
      todo: "Egzersiz yap",
    },
    {
      id: 3,
      todo: "Ders çalış",
    },
    {
      id: 4,
      todo: "Proje geliştir",
    },
    {
      id: 5,
      todo: "Sağlıklı beslen",
    },
    {
      id: 6,
      todo: "Meditasyon yap",
    },
    {
      id: 7,
      todo: "Blog yazısı yaz",
    },
    {
      id: 8,
      todo: "Yeni dil öğren",
    },
    {
      id: 9,
      todo: "Evi temizle",
    },
    {
      id: 10,
      todo: "Film izle",
    },
  ];
  save();
  renderTodos();
  addData.disabled = true;

});

addTodoBtn.addEventListener("click", () => {
  modal.classList.remove("editModal");
  document.querySelector('input[name = "id"]').value = "";
  modal.showModal();
});

function handleMovieForm() {
  let formData = new FormData(addTodoForm);
  let formObj = Object.fromEntries(formData);
  addTodoForm.reset();

  if (formObj.id !== "") {
    let todo = todos.find((x) => x.id === Number(formObj.id));
    todo.todo = formObj.todo;
  } else {
    formObj.id = generateId();
    todos.push(formObj);
  }
  save();
  renderTodos();
}

addTodoForm.addEventListener("submit", handleMovieForm);

function save() {
  localStorage.todos = JSON.stringify(todos);
}

function createMovieHtml(todo) {
  return `<li class='listItem' data-todoid="${todo.id}"><span>${todo.todo}</span>
  <p><button  data-todoid="${todo.id}" class="movieEditBtn">🖋️</button><button  data-todoid="${todo.id}" class="movieDeleteBtn">🗑</button></p>
  </li>`;
}

function handleDeleteBtn(e) {
  e.preventDefault();

  if (!confirm("Emin Misin ?")) {
    return;
  }

  todos = todos.filter((x) => x.id !== Number(this.dataset.todoid));

  save();
  renderTodos();
}

function clear() {
  localStorage.clear();
  liste.innerHTML = "";
  activeTodoCounter = 0;
  activeTodoCount.innerText = 0;
  todos = [];
  renderTodos();
  addTodoForm.reset();
}

clearStorage.addEventListener("click", clear);

function handleEditBtn(e) {
  e.preventDefault();
  modal.classList.add("editModal");

  let todoId = Number(this.dataset.todoid);
  let todo = todos.find((x) => x.id === todoId);

  document.querySelector('input[name = "id"]').value = todo.id;
  document.querySelector('input[name = "todo"]').value = todo.todo;
  modal.showModal();
}

function renderTodos() {
  liste.innerHTML = todos.map((x) => createMovieHtml(x)).join("");

  activeTodoCounter = todos.length;
  activeTodoCount.innerText = activeTodoCounter;

  document
    .querySelectorAll(".movieDeleteBtn")
    .forEach((x) => x.addEventListener("click", handleDeleteBtn));

  document
    .querySelectorAll(".movieEditBtn")
    .forEach((x) => x.addEventListener("click", handleEditBtn));
}

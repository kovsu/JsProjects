const content = document.querySelector(".todo__content");
const input__btn = document.querySelector(".todo__input__icon");
const input__val = document.querySelector(".todo__input input");
const num = document.querySelector(".todo__num");
const operations = document.querySelectorAll(".todo__bar a");

function getId() {
  let id = localStorage.getItem("todo__id");
  if (id) {
    localStorage.setItem("todo__id", parseInt(id) + 1);
    return parseInt(id) + 1;
  } else {
    localStorage.setItem("todo__id", 0);
    return 0;
  }
}

function getTodos() {
  let todos = localStorage.getItem("todos");
  return todos === null ? "[]" : todos;
}

function addTodo(content) {
  let todos = JSON.parse(getTodos());
  localStorage.setItem(
    "todos",
    JSON.stringify([
      {
        id: getId(),
        content,
        status: "active",
      },
      ...todos,
    ])
  );
  input__val.value = "";
}

function removeTodo(id) {
  let todos = JSON.parse(getTodos());
  localStorage.setItem(
    "todos",
    JSON.stringify(todos.filter((todo) => todo.id !== id))
  );
  renderAllItems(todos);
}

function getNewAddTodo() {
  let id = localStorage.getItem("todo__id");
  let todos = JSON.parse(getTodos());
  return todos.find((item) => item.id === parseInt(id));
}

function setTodoStatus(id, status) {
  let todos = JSON.parse(getTodos());
  let index = todos.findIndex((todo) => todo.id === id);
  todos[index].status = status;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function setNum() {
  let count = 0;
  let todos = JSON.parse(getTodos());
  todos.forEach((todo) => {
    if (todo.status !== "completed") {
      count++;
    }
  });
  num.innerHTML = `<p>${count} item left</p>`;
}

function renderItem(item) {
  const li = document.createElement("li");
  li.classList.add("todo__item");
  li.innerHTML = `
    <div class="todo__item-status"></div>
    <div class="todo__info">
      <p>${item.content}</p>
    </div>
    <button class="todo__delete">
      <i class="fa fa-trash-can"></i>
    </button>
  `;
  const deleteBtn = li.querySelector(".todo__delete");
  deleteBtn.addEventListener("click", () => {
    removeTodo(item.id);
    setNum();
  });

  const status = li.querySelector(".todo__item-status");
  status.addEventListener("click", () => {
    if (li.classList.contains("item-active")) {
      setTodoStatus(item.id, "active");
    } else {
      setTodoStatus(item.id, "completed");
    }
    li.classList.toggle("item-active");
    setNum();
  });

  const item_status = li.querySelector(".todo__item-status");
  if (item.status === "completed") {
    li.classList.add("item-active");
  }

  content.appendChild(li);
}

function renderAllItems(items) {
  content.innerHTML = "";
  items.forEach((item) => {
    renderItem(item);
  });
}
const items = JSON.parse(getTodos());
renderAllItems(items);
setNum();

input__val.onkeydown = (e) => {
  if (e.keyCode === 13 && input__val.value) {
    addTodo(input__val.value);
    let item = getNewAddTodo();
    console.log(item);
    renderItem(item);
  }
  setNum();
};

input__btn.addEventListener("click", () => {
  let todos = JSON.parse(getTodos());
  todos.forEach((todo) => {
    setTodoStatus(todo.id, "completed");
  });
  setNum();
  renderAllItems(JSON.parse(getTodos()));
});

function renderStatusItems(status) {
  let todos = JSON.parse(getTodos());
  let items = null;
  if (status === "completed") {
    items = todos.filter((todo) => todo.status === "completed");
  } else if (status === "active") {
    items = todos.filter((todo) => todo.status === "active");
  } else {
    items = todos;
  }
  renderAllItems(items);
}

function clear() {
  operations.forEach((operation) => {
    operation.classList.remove("active-status");
  });
}

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    clear();
    operation.classList.add("active-status");
    renderStatusItems(e.target.attributes["des"].value);
  });
});

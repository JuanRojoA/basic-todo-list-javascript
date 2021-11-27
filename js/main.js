const titleElement = document.getElementById("title-el");
const todoInput = document.getElementById("todo-input-el");
const todoBtn = document.getElementById("todo-btn-el");
const todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");
const optionSelector = document.getElementById("filter-todo-el");
let todos = [];

if (!localStorage.getItem("name")) {
  let userName = prompt("Enter your name");
  localStorage.setItem("name", userName);
}

if (localStorage.getItem("name").endsWith("s")) {
  titleElement.textContent = `${localStorage.getItem("name")}' Todo List`;
} else {
  titleElement.textContent = `${localStorage.getItem("name")}'s Todo List`;
}

if (!localStorage.getItem("todos")) {
  todos = [];
} else {
  todos = JSON.parse(localStorage.getItem("todos"));
  console.log(localStorage.getItem("todos"));
}
renderTodoItem(todos);

todoBtn.addEventListener("click", addItem);
todoList.addEventListener("click", deleteCheck);
optionSelector.addEventListener("click", filterTodo);

function renderTodoItem(array) {
  todoList.innerHTML = "";
  for (i = 0; i < array.length; i++) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    todoDiv.setAttribute("id", `${i}`);

    const newTodoItem = document.createElement("li");
    newTodoItem.innerText = array[i];

    newTodoItem.classList.add("todo-item");
    todoDiv.appendChild(newTodoItem);

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = `<span class="material-icons">task_alt</span>`;
    completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = `<span class="material-icons">delete_forever</span>`;
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
  }
  todoInput.value = "";
  todoInput.focus();
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addItem(e) {
  e.preventDefault();
  if (todoInput.value) {
    todos.push(todoInput.value);
    renderTodoItem(todos);
  }
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const itemParent = item.parentElement;
    itemParent.remove();
    let itemID = item.id[0];
    todos.splice(itemID, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  } else if (item.classList[0] === "completed-btn") {
    const itemParent = item.parentElement;
    itemParent.classList.toggle("completed-task");
  }
  renderTodoItem(todos);
}

function filterTodo(e) {
  const todoItems = todoList.childNodes;
  todoItems.forEach(function (todoItem) {
    switch (e.target.value) {
      case "all":
        todoItem.style.display = "grid";
        break;
      case "completed":
        if (!todoItem.classList.contains("completed-task")) {
          todoItem.style.display = "none";
        } else {
          todoItem.style.display = "grid";
        }
        break;
      case "uncompleted":
        if (todoItem.classList.contains("completed-task")) {
          todoItem.style.display = "none";
        } else {
          todoItem.style.display = "grid";
        }
        break;
    }
  });
}

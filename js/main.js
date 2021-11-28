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

if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  renderTodoItems(todos);
} else {
  todos = [];
}

todoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoInput.value != "") {
    todos.push({ title: todoInput.value, completeState: "uncompleted" });
    renderTodoItems(todos);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
  todoInput.focus();
  todoInput.value = "";
});

todoList.addEventListener("click", (e) => {
  let item = e.target;
  if (item.classList[0] === "completed-btn") {
    let itemID = item.id[0];
    if (todos[itemID].completeState === "completed") {
      todos[itemID].completeState = "uncompleted";
    } else if (todos[itemID].completeState != "completed") {
      todos[itemID].completeState = "completed";
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  } else if (item.classList[0] === "trash-btn") {
    let itemID = item.id[0];
    todos.splice(itemID, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    const itemParent = item.parentElement;
    itemParent.remove();
  }
  renderTodoItems(todos);
});

optionSelector.addEventListener("click", (e) => {
  const todoItems = todoList.childNodes;
  todoItems.forEach((todoItem) => {
    switch (e.target.value) {
      case "all":
        todoItem.style.display = "grid";
        break;
      case "completed":
        if (!todoItem.classList.contains("completed")) {
          todoItem.style.display = "none";
        } else {
          todoItem.style.display = "grid";
        }
        break;
      case "uncompleted":
        if (todoItem.classList.contains("completed")) {
          todoItem.style.display = "none";
        } else {
          todoItem.style.display = "grid";
        }
        break;
    }
  });
});

function renderTodoItems(array) {
  let todoItems = "";
  for (i = 0; i < array.length; i++) {
    todoItems += `<div class="todo-item ${array[i].completeState}">
    <li class="todo">${array[i].title}</li>
    <button class="completed-btn" id="${i}">
      <span class="material-icons btn-icon"> task_alt </span>
    </button>
    <button class="trash-btn" id="${i}">
      <span class="material-icons btn-icon"> delete_outline </span>
    </button>
  </div>`;
  }
  todoList.innerHTML = todoItems;
}

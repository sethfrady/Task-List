// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const customName = document.querySelector(".custom");

// Function Calls
pageLoad();

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function pageLoad() {
  const person = prompt("Name your todo list for full access!", "TODO : LIST");
  if (person == null || person == "") {
    customName.innerText = "TODO : LIST";
  } else {
    customName.innerText = person;
  }
}

function addTodo(event) {
  event.preventDefault(); // stops the refreshing of page when you click on addTodo
  // Todo Div
  const todoDiv = document.createElement("div"); // <div></div>
  todoDiv.classList.add("todo"); // <div class="todo"></div>
  // Create LI
  const newTodo = document.createElement("li"); // <div class="todo"></div><li></li>
  newTodo.innerText = todoInput.value; // .value lets the user input whatever they want <div class="todo"></div><li></li>
  newTodo.classList.add("todo-item"); // <div class="todo"></div><li class="todo-item">hey</li>
  todoDiv.appendChild(newTodo); // COMBINES THE LI with DIV <div class="todo"><li class="todo-item">hey</li></div>
  // ADD TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);
  // CHECKMARK BUTTON
  const completedButton = document.createElement("button"); // <button></button>
  completedButton.innerHTML = '<i class="fas fa-check"></i>'; // creates an icon <button><i class="fas fa-check"></i></button>
  completedButton.classList.add("complete-btn"); // <button class="complete-btn"><i class="fas fa-check"></i></button>
  todoDiv.appendChild(completedButton); // <div class="todo"><li class="todo-item">hey</li><button class="complete-btn"><i class="fas fa-check"></i></button></div>
  // TRASH BUTTON
  const trashButton = document.createElement("button"); // <button></button>
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // creates an icon <button><i class="fas fa-trash"></i></button>
  trashButton.classList.add("trash-btn"); // <button class="trash-btn"><i class="fas fa-trash"></i></button>
  todoDiv.appendChild(trashButton); // <div class="todo"><li class="todo-item">hey</li><button class="complete-btn"><i class="fas fa-check"></i></button><button class="trash-btn"><i class="fas fa-trash"></i></button></div>
  // Append to List
  todoList.appendChild(todoDiv);
  // Clear todoInput Value after Adding to List
  todoInput.value = "";
}

function deleteCheck(event) {
  // console.log(event.target); helps us find out what we are inspecting in console
  const item = event.target; /* refers to the item being interacted with */
  // Delete TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement; /* access to the div (parent element) */
    todo.classList.add("fall"); /* used for animation in css */
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // Checkmark TODO
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    confetti.start(1000);
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // Check -- Hey do I already have things in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  // Check - Hey do I already have anything in there?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo Div
    const todoDiv = document.createElement("div"); // <div></div>
    todoDiv.classList.add("todo"); // <div class="todo"></div>
    // Create LI
    const newTodo = document.createElement("li"); // <div class="todo"></div><li></li>
    newTodo.innerText = todo; // .value lets the user input whatever they want <div class="todo"></div><li></li>
    newTodo.classList.add("todo-item"); // <div class="todo"></div><li class="todo-item">hey</li>
    todoDiv.appendChild(newTodo); // COMBINES THE LI with DIV <div class="todo"><li class="todo-item">hey</li></div>
    // CHECKMARK BUTTON
    const completedButton = document.createElement("button"); // <button></button>
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; // creates an icon <button><i class="fas fa-check"></i></button>
    completedButton.classList.add("complete-btn"); // <button class="complete-btn"><i class="fas fa-check"></i></button>
    todoDiv.appendChild(completedButton); // <div class="todo"><li class="todo-item">hey</li><button class="complete-btn"><i class="fas fa-check"></i></button></div>
    // TRASH BUTTON
    const trashButton = document.createElement("button"); // <button></button>
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // creates an icon <button><i class="fas fa-trash"></i></button>
    trashButton.classList.add("trash-btn"); // <button class="trash-btn"><i class="fas fa-trash"></i></button>
    todoDiv.appendChild(trashButton); // <div class="todo"><li class="todo-item">hey</li><button class="complete-btn"><i class="fas fa-check"></i></button><button class="trash-btn"><i class="fas fa-trash"></i></button></div>
    // Append to List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Check - Hey do I already have anything in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText; /* access to the <li> */
  todos.splice(
    todos.indexOf(todoIndex),
    1
  ); /* .splice can removes an element from an array */
  localStorage.setItem("todos", JSON.stringify(todos));
}

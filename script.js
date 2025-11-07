var addButton = document.getElementById("add-button");
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

addButton.addEventListener("click", addToDoItem);
document.addEventListener("click", createClickSpark); // efek petasan klik

function newToDoItem(itemText, completed) {
  var toDoItem = document.createElement("li");
  var toDoText = document.createTextNode(itemText);
  toDoItem.appendChild(toDoText);

  // Tombol hapus
  var deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "❌";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    toDoItem.remove();
    saveList();
  };
  toDoItem.appendChild(deleteBtn);

  if (completed) {
    toDoItem.classList.add("completed");
  }

  toDoList.appendChild(toDoItem);
  toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function addToDoItem() {
  var itemText = toDoEntryBox.value.trim();
  if (itemText !== "") {
    newToDoItem(itemText, false);
    toDoEntryBox.value = "";
    saveList();
  }
}

function toggleToDoItemState() {
  this.classList.toggle("completed");
  saveList();
}

function clearCompletedToDoItems() {
  var completedItems = document.querySelectorAll("#todo-list .completed");
  completedItems.forEach(item => item.remove());
  saveList();
}

function emptyList() {
  toDoList.innerHTML = "";
  saveList();
}

function saveList() {
  var toDos = [];
  for (var i = 0; i < toDoList.children.length; i++) {
    var toDo = toDoList.children.item(i);
    toDos.push({
      task: toDo.childNodes[0].textContent,
      completed: toDo.classList.contains("completed")
    });
  }
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
  var saved = localStorage.getItem("toDos");
  if (saved) {
    var toDos = JSON.parse(saved);
    toDos.forEach(t => newToDoItem(t.task, t.completed));
  }
}
loadList();

// Efek petasan klik putih di kursor
function createClickSpark(e) {
  var spark = document.createElement("span");
  spark.className = "click-spark";
  spark.style.left = e.pageX + "px";
  spark.style.top = e.pageY + "px";
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 500);
}

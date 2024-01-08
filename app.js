var taskInput = document.getElementById("add-task__input");
var addButton = document.querySelector(".add-task__button");
var todoTaskHolder = document.querySelector(".todo__task-list");
var completedTasksHolder = document.querySelector(".completed__task-list");

var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  listItem.classList.add("task-item");
  label.innerText = taskString;
  label.classList.add("task-item__label");

  checkBox.type = "checkbox";
  checkBox.classList.add("task-item__checkbox");

  editInput.type = "text";
  editInput.classList.add("task-item__input");

  editButton.innerText = "Edit";
  editButton.classList.add("task-item__edit-button");

  deleteButton.classList.add("task-item__delete-button");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Delete task button";
  deleteButtonImg.classList.add("task-item__delete-button-img");
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function() {
  console.log("Add Task...");
  // Create a new list item with the text from the #add-task__input:
  if (!taskInput.value) return;

  var listItem = createNewTaskElement(taskInput.value);
  todoTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

// Edit an existing task.
var editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".task-item__input");
  var label = listItem.querySelector(".task-item__label");
  var editBtn = listItem.querySelector(".task-item__edit-button");
  var containsClass = listItem.classList.contains("task-item_edit-mode");
  
  // If class of the parent is .edit-mode
  if(containsClass){
    // switch to .edit-mode; label becomes the inputs value
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  // toggle .edit-mode on the parent.
  listItem.classList.toggle("task-item_edit-mode");
};

var deleteTask = function() {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

// Mark task completed
var taskCompleted = function() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  console.log("Incomplete Task...");

  // When the checkbox is unchecked, mark task as incomplete (todo) and
  // append the task list item to the #todo-tasks.
  var listItem = this.parentNode;
  todoTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  console.log("bind list item events");

  var checkBox = taskListItem.querySelector(".task-item__checkbox");
  var editButton = taskListItem.querySelector(".task-item__edit-button");
  var deleteButton = taskListItem.querySelector(".task-item__delete-button");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < todoTaskHolder.children.length; i++) {
  bindTaskEvents(todoTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

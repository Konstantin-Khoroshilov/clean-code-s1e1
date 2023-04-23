//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("current-tasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

  var listItem=document.createElement("li");
  //label
  var label=document.createElement("label");//label

  //input (checkbox)
  var checkBox = document.createElement("input");//checkbx
  
  var taskName=document.createElement("span");//checkbx
  //input (text)
  var editInput = document.createElement("input");//text
  var buttonsContainer = document.createElement("div");//buttons
  //button.edit
  var editButton=document.createElement("button");//edit button

  //button.delete
  var deleteButton=document.createElement("button");//delete button
  var deleteButtonImg=document.createElement("img");//delete button image

  listItem.className = 'task';

  label.className = 'status-label';

  checkBox.type = "checkbox";
  checkBox.classList.add('task-status', 'task__task-status');

  taskName.innerText = taskString;
  taskName.className = 'task-name';

  //Each elements, needs appending
  
  editInput.type="text";
  editInput.classList.add('task-input', 'task-input_type_saved');

  buttonsContainer.className = 'task__buttons';

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.classList.add('button', 'button_type_edit');

  deleteButton.classList.add('button', 'button_type_delete');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'delete-image';
  deleteButton.appendChild(deleteButtonImg);


    //and appending.
  label.appendChild(checkBox);
  label.appendChild(taskName);
  buttonsContainer.appendChild(editButton);
  buttonsContainer.appendChild(deleteButton);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(buttonsContainer);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem = this.parentNode.parentNode;
  let taskName = listItem.querySelector('.task-name');
  var editInput=listItem.querySelector('.task-input');
  var label=listItem.querySelector("label");
  var editBtn=listItem.querySelector(".button_type_edit");
  var containsClass=editInput.classList.contains("task-input_type_saved");
  if (containsClass) {
    editInput.value = taskName.textContent;
    editInput.classList.remove("task-input_type_saved");
    editBtn.innerText = "Save";
    taskName.classList.add('task-name_style_edit-mode');
  } else {
    //switch to .editmode
    editBtn.innerText = "Edit";
    taskName.textContent = editInput.value;
    editInput.classList.add("task-input_type_saved");
    taskName.classList.remove('task-name_style_edit-mode');
  }
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode.parentNode;
  var ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode.parentNode;
  let taskName = listItem.querySelector('.task-name');
  taskName.classList.add('task-name_style_completed-task');
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode.parentNode;
  let taskName = listItem.querySelector('.task-name');
  taskName.classList.remove('task-name_style_completed-task');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  var checkBox=taskListItem.querySelector(".task-status");
  var editButton=taskListItem.querySelector(".button_type_edit");
  var deleteButton=taskListItem.querySelector(".button_type_delete");


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
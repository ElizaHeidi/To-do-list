let addBtn = document.querySelector('.add-task');
let tasksDiv = document.querySelector('.tasks');
let ul = document.getElementById('ul');
let clearBtn = document.querySelector('.clear-task');
let housekeepDiv = document.querySelector('.housekeep');
const delAllBtn = document.querySelector('.delAll');
const taskInput = document.querySelector('#task-input');

addBtn.addEventListener('click', getTask);
clearBtn.addEventListener('click', clearTask);
taskInput.addEventListener('click', stopTaskInput);
ul.addEventListener('click', deleteTask); // Add event listener for click on the ul element
delAllBtn.addEventListener('click', delAll);

window.addEventListener('load', () => {
  if (localStorage.getItem('taskList')) {
    ul.innerHTML = localStorage.getItem('taskList');
  }
  disableDelAll();
});

function getTask() {
  const li = document.createElement('li');
  if (document.getElementById('task-input').value === '') {
    return;
  } else {
    // Create Trash button
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-icon');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-trash');
    trashBtn.appendChild(icon);

    // Create label and checkbox, populate text input 
    li.appendChild(trashBtn);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'checkbox';
    checkbox.value = li;
    checkbox.id = 'checkbox';
    li.appendChild(checkbox);

    const label = document.createElement('label');
    label.textContent = document.getElementById('task-input').value;
    li.appendChild(label);

    // Add li element to the ul element
    ul.appendChild(li);

    // Save tasks to local storage
    localStorage.setItem('taskList', ul.innerHTML);
  }

  disableDelAll();

} // getTask() ends

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
    getTask();
    }
  });



  function disableDelAll() {
    console.log('test');
    if (ul.childElementCount > 0) {
      delAllBtn.disabled = false;
    } else {
      delAllBtn.disabled = true;
    }
}

function clearTask() {
  document.getElementById('task-input').value = '';
}

function deleteTask(e) {
  if (e.target.classList.contains('trash-icon')) {
    const li = e.target.parentNode;
    const checkbox = li.querySelector('input[type="checkbox"]');
    const label = li.querySelector('label');

    ul.removeChild(li);
    localStorage.setItem('taskList', ul.innerHTML);
    disableDelAll();
  }
}

function delAll() {
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild);
    localStorage.removeItem('taskList');
    disableDelAll();
}
}



function stopTaskInput(event) {
  event.stopPropagation();
}

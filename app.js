let addBtn = document.querySelector('.add-task');
let tasksDiv = document.querySelector('.tasks');
let ul = document.getElementById('ul');
let clearBtn = document.querySelector('.clear-task');
let housekeepDiv = document.querySelector('.housekeep');
const delAllBtn = document.querySelector('.delAll');
const taskInput = document.querySelector('#task-input');

// Load saved tasks from local storage
if (localStorage.getItem('taskList')) {
  ul.innerHTML = localStorage.getItem('taskList');
}

addBtn.addEventListener('click', getTask);
clearBtn.addEventListener('click', clearTask);
taskInput.addEventListener('click', stopTaskInput);

let delAllBtnCreated = false;

function getTask() {
  if (!delAllBtnCreated) {
    // Create Delete All button
    const delAllBtn = document.createElement('button');
    delAllBtn.textContent = 'Delete all';
    delAllBtn.addEventListener('click', delAll);
    housekeepDiv.appendChild(delAllBtn);
    delAllBtnCreated = true;
  }
   
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

    ul.appendChild(trashBtn);

    ul.addEventListener('click', function(event) {
      if (event.target.classList.contains('trash-icon')) {
        console.log('Trash button clicked');
        ul.removeChild(label);
        ul.removeChild(checkbox);
      }
    });

    // Create checkbox and label for task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'checkbox';
    checkbox.value = li;
    checkbox.id = 'checkbox';
    ul.appendChild(checkbox);

    const label = document.createElement('label');
    label.textContent = document.getElementById('task-input').value;
    ul.appendChild(label);

    ul.appendChild(document.createElement('br'));

    // Save tasks to local storage
    localStorage.setItem('taskList', ul.innerHTML);
  }
}

function clearTask() {
  document.getElementById('task-input').value = '';
}

function delAll() {
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild);
  }

  while (housekeepDiv.hasChildNodes()) {
    housekeepDiv.removeChild(housekeepDiv.lastChild);
  }

  localStorage.removeItem('taskList');

  // Reset flag for Delete All button
  delAllBtnCreated = false;
}

function stopTaskInput(event) {
  event.stopPropagation();
}

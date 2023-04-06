let addBtn = document.querySelector('.add-task');
let tasksDiv = document.querySelector('.tasks');
const ul = document.getElementById('ul');
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
    handleTrash();
  

  // Create checkbox and label for task
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'checkbox';
  checkbox.value = li;
  checkbox.id = 'checkbox';
  li.appendChild(checkbox);

  const label = document.createElement('label');
  label.textContent = document.getElementById('task-input').value;
  li.appendChild(label);

  li.appendChild(document.createElement('br'));

  // Append li element with checkbox, label and trash button to the ul element
  ul.appendChild(li);

  // Save tasks to local storage
  localStorage.setItem('taskList', ul.innerHTML);
}


 function handleTrash() {
  const trashBtn = document.createElement('button');
  trashBtn.classList.add('trash-icon');

  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-trash');
  trashBtn.appendChild(icon);

  li.appendChild(trashBtn);
}}

// Attach event listener to the ul element using event delegation
ul.addEventListener('click', function(e) {
    if (e.target.classList.contains('trash-icon')) {
      console.log('Trash button clicked');
      const li = e.target.closest('li');
      if (li && ul.contains(li)) {
        ul.removeChild(li);
      }
    } else if (e.target.classList.contains('delAll')) {
      delAll();
    }
  });
  


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



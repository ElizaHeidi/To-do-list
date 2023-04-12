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
ul.addEventListener('click', deleteTask); 
delAllBtn.addEventListener('click', delAll);


// check if ul child elements are > 0, if yes, then enable DelAll
// If no, then disable delAll
function disableDelAll() {
    console.log('test');
    if (ul.childElementCount > 0) {
      delAllBtn.disabled = false;
    } else {
      delAllBtn.disabled = true;
    }
}

// When page loads, fetch taskList if present in local storage,
// check if ul child elements are > 0, then run disableDelAll() 
// decision tree 
window.addEventListener('load', () => {
  if (localStorage.getItem('taskList')) {
    ul.innerHTML = localStorage.getItem('taskList');
  }
  disableDelAll();
});


// Create element li, create trashButton, create trash icon
// append trash icon to trashButton, append trashButton to li
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

    
    li.appendChild(trashBtn);

    // Create checkbox, append to li, create label,
    // whatever the text value of task-input is, set that = to 
    // the label text content, append label to li
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'checkbox';
    checkbox.value = li;
    checkbox.id = 'checkbox';
    li.appendChild(checkbox);

    const label = document.createElement('label');
    label.textContent = document.getElementById('task-input').value;
    li.appendChild(label);

    // Append li to the ul 
    ul.appendChild(li);

    // Save tasks (ul.innerHTML) to local storage
    localStorage.setItem('taskList', ul.innerHTML);
  }

  // check if ul child elements are > 0, then run disableDelAll() 
// decision tree
  disableDelAll();

  taskInput.value = '';

} // getTask() ends

// Listen for Return key in task-input bar
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
    getTask();
    }
  });

// Functions

// Set task-input text value to ''
function clearTask() {
  document.getElementById('task-input').value = '';
}

// if an item clicked contains the classlist 'trash-icon,'
// then remove the child element li from the ul, from local storage,
// and check if ul child elements are > 0, then run disableDelAll() 
// decision tree 
function deleteTask(e) {
  if (e.target.classList.contains('trash-icon') || e.target.classList.contains('fa-trash')) {
    const li = e.target.closest('li');
    const checkbox = li.querySelector('input[type=“checkbox”]');
    const label = li.querySelector('label');

    ul.removeChild(li);
    localStorage.setItem('taskList', ul.innerHTML);
    disableDelAll();
  }
}

// While the ul has child nodes, remove all of them, remove from local storage,
// and check if ul child elements are > 0, then run disableDelAll() 
// decision tree 
function delAll() {
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild);
    localStorage.removeItem('taskList');
    disableDelAll();
}
}

// Stop event propagation on chosen element
function stopTaskInput(event) {
  event.stopPropagation();
}

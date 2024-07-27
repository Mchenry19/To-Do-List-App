// Get the form element by its ID
const form = document.getElementById('add-task-form');
// Get the input field element by its ID
const taskInput = document.getElementById('task-input');

// Get the tasklist element by its ID
const taskList = document.getElementById('task-list');



// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span>${task}</span>
      <button class="delete-btn">Delete</button>
      <button class="update-btn">Update</button>
    `;
    taskList.appendChild(taskItem);
  });
});

// Update the event listener for form submission to include local storage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <span>${task}</span>
    <button class="delete-btn">Delete</button>
    <button class="update-btn">Update</button>
  `;
  taskList.appendChild(taskItem);
  taskInput.value = '';

  // Save tasks to local storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

// Update the event listener for delete and update to include local storage
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentNode.remove();
    updateLocalStorage();
  } else if (e.target.classList.contains('update-btn')) {
    const taskItem = e.target.parentNode;
    const newTask = prompt('Enter the updated task:');
    taskItem.querySelector('span').textContent = newTask;
    updateLocalStorage();
  }
});

// Function to update local storage with current tasks
function updateLocalStorage() {
  const tasks = Array.from(taskList.children).map(taskItem => taskItem.querySelector('span').textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
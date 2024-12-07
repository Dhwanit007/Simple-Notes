// Select elements
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach((taskItem) => {
    const taskText = taskItem.querySelector('.task-text').textContent;
    const taskDate = taskItem.querySelector('.task-date').textContent;
    const isCompleted = taskItem.classList.contains('completed');
    tasks.push({ text: taskText, date: taskDate, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach((task) => {
    const listItem = document.createElement('li');
    if (task.completed) listItem.classList.add('completed');

    const taskSpan = document.createElement('span');
    taskSpan.classList.add('task-text');
    taskSpan.textContent = task.text;
    taskSpan.addEventListener('click', () => {
      listItem.classList.toggle('completed');
      saveTasksToLocalStorage();
    });

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('task-date');
    dateSpan.textContent = task.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(listItem);
      saveTasksToLocalStorage();
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(dateSpan);
    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);
  });
}

// Add new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const taskDueDate = taskDate.value;

  if (taskText === '' || taskDueDate === '') {
    alert('Please enter both task details and date!');
    return;
  }

  const listItem = document.createElement('li');

  const taskSpan = document.createElement('span');
  taskSpan.classList.add('task-text');
  taskSpan.textContent = 'Task:  ' + taskText;
  taskSpan.addEventListener('click', () => {
    listItem.classList.toggle('completed');
    saveTasksToLocalStorage();
  });

  const dateSpan = document.createElement('span');
  dateSpan.classList.add('task-date');
  dateSpan.textContent = 'Date Added: ' + taskDueDate;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(listItem);
    saveTasksToLocalStorage();
  });

  listItem.appendChild(taskSpan);
  listItem.appendChild(dateSpan);
  listItem.appendChild(deleteBtn);
  taskList.appendChild(listItem);

  // Save the updated tasks to localStorage
  saveTasksToLocalStorage();

  // Clear the input fields
  taskInput.value = '';
  taskDate.value = '';
});

// Load tasks from localStorage when the page loads
window.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);




// DARK MODE AND LIGHT MODE LOGICSS..

// Select the toggle button and body
const modeToggle = document.getElementById('modeToggle');
const modeText = document.getElementById('modeText');
const body = document.body;
const container = document.querySelector('.container');

// Function to toggle dark mode
function toggleDarkMode() {
  const isDarkMode = body.classList.toggle('dark-mode');
  container.classList.toggle('dark-mode');
  document.querySelectorAll('textarea, input, button, li').forEach((el) => {
    el.classList.toggle('dark-mode');
  });

  // Update the button icon
  modeText.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';

  // Save the preference
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Event listener for the toggle button
modeToggle.addEventListener('click', toggleDarkMode);

// Load the saved theme preference
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (isDarkMode){
    body.classList.add('dark-mode');
    modeText.textContent = "Dark Mode";;
  }else{
    modeText.textContent = "Light Mode"
  }
});

// Function to replace h1 with h3 for smaller screens
function replaceH1WithH3() {
    const h1Elements = document.querySelectorAll('h1');

    h1Elements.forEach(h1 => {
        // Create a new h3 element
        const h3 = document.createElement('h3');
        h3.innerHTML = h1.innerHTML; // Copy content
        h3.className = h1.className; // Copy class

        // Replace h1 with h3 in the DOM
        h1.parentNode.replaceChild(h3, h1);
    });
}

// Add event listener to handle screen resizing
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        replaceH1WithH3();
    }
});

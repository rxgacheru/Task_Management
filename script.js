let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskManagerContainer = document.querySelector(".taskManager");
const confirmEl = document.querySelector(".confirm");
const confirmedBtn = confirmEl.querySelector(".confirmed");
const cancelledBtn = confirmEl.querySelector(".cancel");
let indexToBeDeleted = null

//event listener to the form submit event
document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);

//form submission code
function handleFormSubmit(event) {
  event.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const newTask = {
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    taskInput.value = '';
    renderTasks();
  }
}


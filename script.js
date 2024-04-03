let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskManagerContainer = document.querySelector(".taskManager");
const confirmEl = document.querySelector(".confirm");
const confirmedBtn = confirmEl.querySelector(".confirmed");
const cancelledBtn = confirmEl.querySelector(".cancel");
let indexToBeDeleted = null

// Add event listener to the form submit event
document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);

// Function to handle form submission
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


function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();


function renderTasks() {
  const taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('taskCard');
    let classVal = "pending";
    let textVal = "Pending"
    if (task.completed) {
      classVal = "completed";
      textVal = "Completed";
    }
    taskCard.classList.add(classVal);

    const taskText = document.createElement('p');
    taskText.innerText = task.text;

    const taskStatus = document.createElement('p');
    taskStatus.classList.add('status');
    taskStatus.innerText = textVal;

    const toggleButton = document.createElement('button');
    toggleButton.classList.add("button-box");
    const btnContentEl = document.createElement("span");
    btnContentEl.classList.add("green");
    btnContentEl.innerText = task.completed ? 'Mark as Pending' : 'Mark as Completed';
    toggleButton.appendChild(btnContentEl);
    toggleButton.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("button-box");
    const delBtnContentEl = document.createElement("span");
    delBtnContentEl.classList.add("red");
    delBtnContentEl.innerText = 'Delete';
    deleteButton.appendChild(delBtnContentEl);
    deleteButton.addEventListener('click', () => {
      indexToBeDeleted = index
      confirmEl.style.display = "block";
      taskManagerContainer.classList.add("overlay");
    });

    taskCard.appendChild(taskText);
    taskCard.appendChild(taskStatus);
    taskCard.appendChild(toggleButton);
    taskCard.appendChild(deleteButton);

    taskContainer.appendChild(taskCard);
  });
}


function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

confirmedBtn.addEventListener("click", () => {
  confirmEl.style.display = "none";
  taskManagerContainer.classList.remove("overlay");
  deleteTask(indexToBeDeleted)
});

cancelledBtn.addEventListener("click", () => {
  confirmEl.style.display = "none";
  taskManagerContainer.classList.remove("overlay");
});


let availableKeywords = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'Java',
];

const resultsBox = document.querySelector('result-box');
const inputBox = document.getElementById('input-box');

inputBox.onkeyup = function() {
 let result = [];
 let input = inputBox.value;
 if(input.length){
   result = availableKeywords.filter((keyword)=>{
      return keyword.toLowerCase().includes(input.toLowerCase());
   });
   console.log(result);
 }
 display(result);

 if(!result.lenght){
   resultsBox.innerHTML = '';
 }
}

function display(reults){
 const content = result.map((list)=>{
   return "<li onclick=selectInput(this)>" + list + "</li>";
 });
console.log(results)
 resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>"
}

function selectInput(list){
 inPutBox.value = list.innerHTML;
 resultsBox.innerHTML = '';
} 

let availabeKeywords = [
  'Task1',
  'Task2',
  'Task3',
  'Task4',
];

const resultBox = document.querySelector('.results-box');
const inputBox = document.getElementBById('input-box');
inputBox.onkeyup = function(){
  let result = [];
  let input = inputBox.value;
  if(input.length){
    result = availableKeywords.filter((Keyword)=>{
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
    console.log(result);
  }
  display(result);

  if(!result.length){
    resultsBox.innerHTML = '';
  }
}

function display(result){
  const content = result.map((list)=>{
    return "<li onclick=selectInput(this)>" + list + "</li>";
  });

  resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list){
  inputBox.value = list.innerHTML;
  resultsBox.innerHTML ='';
}
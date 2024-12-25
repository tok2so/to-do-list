let tasks = []; 
let completedTasks = [];

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const completedList = document.getElementById("completed-list");

// Отображение задач
function renderTasks() {
    taskList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = createTaskElement(task, index, false);
        taskList.appendChild(li);
    });

    completedTasks.forEach((task, index) => {
        const li = createTaskElement(task, index, true);
        completedList.appendChild(li);
    });
}

function createTaskElement(task, index, isCompleted) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    if (isCompleted) li.classList.add("completed");

    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = task;

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    // Кнопка завершения задачи
    const doneImg = document.createElement("img");
    doneImg.src = "done.png"; // Замените на путь к вашей картинке
    doneImg.alt = "Done";
    doneImg.title = isCompleted ? "Undo Task" : "Mark as Done";
    doneImg.onclick = () => toggleTaskCompletion(index, isCompleted);

    // Кнопка редактирования задачи
    const editImg = document.createElement("img");
    editImg.src = "edit.png"; // Замените на путь к вашей картинке
    editImg.alt = "Edit";
    editImg.title = "Edit Task";
    editImg.onclick = () => editTask(index, isCompleted);

    // Кнопка удаления задачи
    const deleteImg = document.createElement("img");
    deleteImg.src = "delete.png"; // Замените на путь к вашей картинке
    deleteImg.alt = "Delete";
    deleteImg.title = "Delete Task";
    deleteImg.onclick = () => deleteTask(index, isCompleted);

    // Добавляем кнопки в группу
    buttonGroup.appendChild(doneImg);
    buttonGroup.appendChild(editImg);
    buttonGroup.appendChild(deleteImg);

    li.appendChild(taskText);
    li.appendChild(buttonGroup);

    return li;
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }
    tasks.push(taskText);
    taskInput.value = "";
    renderTasks();
}

function editTask(index, isCompleted) {
    const taskArray = isCompleted ? completedTasks : tasks;
    const newTask = prompt("Edit your task:", taskArray[index]);
    if (newTask !== null && newTask.trim() !== "") {
        taskArray[index] = newTask.trim();
        renderTasks();
    }
}

// Завершение/возврат задачи
function toggleTaskCompletion(index, isCompleted) {
    if (isCompleted) {
        tasks.push(completedTasks[index]);
        completedTasks.splice(index, 1);
    } else {
        completedTasks.push(tasks[index]);
        tasks.splice(index, 1);
    }
    renderTasks();
}

function deleteTask(index, isCompleted) {
    if (isCompleted) {
        completedTasks.splice(index, 1);
    } else {
        tasks.splice(index, 1);
    }
    renderTasks();
}

// Обработчики событий
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});


renderTasks();

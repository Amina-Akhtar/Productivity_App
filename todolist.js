let todos = [];
let totalTasks = 0;
let completedTasks = 0;
if (localStorage.getItem('todos')) {
  todos = JSON.parse(localStorage.getItem('todos'));
}
const task_input = document.querySelector(".input");
const time_input = document.querySelector(".schedule-time");
const add_btn = document.querySelector(".add-task-button");
const todos_list_body = document.querySelector(".todos-list-body");
const alert_message = document.querySelector(".alert-message");
const delete_all_btn = document.querySelector(".delete-all-btn");



document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('.hamburger-menu input');
    const sidebar = document.querySelector('.sidebar');

    // Ensure sidebar is initially hidden
    sidebar.style.transform = 'translateX(-100%)';

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        sidebar.style.transform = 'translateX(0)';
      } else {
        sidebar.style.transform = 'translateX(-100%)';
      }
    });
  });
  
window.addEventListener("DOMContentLoaded", () => {
  showAllTodos();
  if (!todos.length) {
    displayTodos([]);
  }
});
function updateTaskStatusLocalStorage() {
  const taskStatus = {
    totalTasks: totalTasks,
    completedTasks: completedTasks,
  };
  console.log('Total Tasks:', totalTasks);
  console.log('Completed Tasks:', completedTasks);
  localStorage.setItem('taskStatus', JSON.stringify(taskStatus));
}


function getRandomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function addToDo(task_input, time_input) {
  let task = {
    id: getRandomId(),
    task: task_input.value.length > 14 ? task_input.value.slice(0, 14) + "..." : task_input.value,
    dueTime: time_input.value || "No time",
    completed: false,
    status: "pending",
  };
  todos.push(task);
  const tasked = JSON.parse(localStorage.getItem('taskStatus')) || {};
  totalTasks = tasked.totalTasks || 0;
  totalTasks++; 
  updateTaskStatusLocalStorage();
}

task_input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 && task_input.value.length > 0) {
    addToDo(task_input, time_input); 
    saveToLocalStorage();
    task_input.value = "";
    showAllTodos();
  }
});

add_btn.addEventListener("click", () => {
  if (task_input.value === "") {
    showAlertMessage("Please enter a task", "error");
  } else {
    addToDo(task_input, time_input); 
    saveToLocalStorage();
    showAllTodos();
    task_input.value = "";
    time_input.value = ""; 
    showAlertMessage("Task added successfully", "success");
  }
});

delete_all_btn.addEventListener("click", clearAllTodos);

//show all todos
function showAllTodos() {
  todos_list_body.innerHTML = "";
  if (todos.length === 0) {
    todos_list_body.innerHTML = `<tr><td colspan="5" class="text-center">No task found</td></tr>`;
    return;
  }

  todos.forEach((todo) => {
    todos_list_body.innerHTML += `
            <tr class="todo-item" data-id="${todo.id}">
                <td>${todo.task}</td>
                <td>${todo.dueTime || "No time"}</td>
                <td>${todo.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editTodo('${
                      todo.id
                    }')">
                        <i class="bx bx-edit-alt bx-bx-xs"></i>    
                    </button>
                    <button class="btn btn-success btn-sm" onclick="toggleStatus('${
                      todo.id
                    }')">
                        <i class="bx bx-check bx-xs"></i>
                    </button>
                    <button class="btn btn-error btn-sm" onclick="deleteTodo('${
                      todo.id
                    }')">
                        <i class="bx bx-trash bx-xs"></i>
                    </button>
                </td>
            </tr>
        `;
  });
}

//save todos to local storage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//show alert message
function showAlertMessage(message, type) {
  let alert_box = `
        <div class="alert alert-${type} shadow-lg mb-5 w-full">
            <div>
                <span>
                    ${message}
                </span>
            </div>
        </div>
    `;
  alert_message.innerHTML = alert_box;
  alert_message.classList.remove("hide");
  alert_message.classList.add("show");
  setTimeout(() => {
    alert_message.classList.remove("show");
    alert_message.classList.add("hide");
  }, 3000);
}

//delete todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
 // totalTasks=totaltasks-1;
  updateTaskStatusLocalStorage();
  saveToLocalStorage();
  showAlertMessage("Task deleted successfully", "success");
  showAllTodos();
}

//edit todo
function editTodo(id) {
  let todo = todos.find((todo) => todo.id === id);
  task_input.value = todo.task;
  todos = todos.filter((todo) => todo.id !== id);
  add_btn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
  saveToLocalStorage();
  add_btn.addEventListener("click", () => {
    add_btn.innerHTML = "<i class='bx bx-plus bx-sm'></i>";
    showAlertMessage("Task updated successfully", "success");
  });
}

function clearAllTodos() {
  if (todos.length > 0) {
    todos = [];
    
    saveToLocalStorage();
    showAlertMessage("All tasks deleted successfully", "success");
    showAllTodos();
  } else {
    showAlertMessage("No tasks to delete", "error");
  }
}

function toggleStatus(id) {
  let todo = todos.find((todo) => todo.id === id);
  
  todo.completed = !todo.completed;
  
 completedTasks++;
 
  saveToLocalStorage();
  updateTaskStatusLocalStorage(); 
  displayTodos(todos);
}

function filterTodos(status) {
  let filteredTodos;
  switch (status) {
    case "all":
      filteredTodos = todos;
      break;
    case "pending":
      filteredTodos = todos.filter((todo) => !todo.completed);
      break;
    case "completed":
      filteredTodos = todos.filter((todo) => todo.completed);
      break;
  }
  displayTodos(filteredTodos);
}

function displayTodos(todosArray) {
  todos_list_body.innerHTML = "";
  if (todosArray.length === 0) {
    todos_list_body.innerHTML = `<tr><td colspan="5" class="text-center">No task found</td></tr>`;
    return;
  }
  todosArray.forEach((todo) => {
    todos_list_body.innerHTML += `
            <tr class="todo-item" data-id="${todo.id}">
                <td>${todo.task}</td>
                <td>${todo.dueTime || "No time"}</td>
                <td>${todo.completed ? "Completed" : "Pending"}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editTodo('${
                      todo.id
                    }')">
                        <i class="bx bx-edit-alt bx-bx-xs"></i>    
                    </button>
                    <button class="btn btn-success btn-sm" onclick="toggleStatus('${
                      todo.id
                    }')">
                        <i class="bx bx-check bx-xs"></i>
                    </button>
                    <button class="btn btn-error btn-sm" onclick="deleteTodo('${
                      todo.id
                    }')">
                        <i class="bx bx-trash bx-xs"></i>
                    </button>
                </td>
            </tr>
    `;
  });
}
// TaskFlow - Team Task Management System

let tasks = [
    {
        id: 1,
        title: "Sample Task",
        description: "This is what a task looks like",
        dueDate: "2025-10-15",
        assignedTo: "",
        completed: false
    }
];

// Render all tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'card task-item mb-3';

        // Check if task is overdue
        const today = new Date().toISOString().split('T')[0];
        const isOverdue = task.dueDate < today && !task.completed;

        if (isOverdue) {
            taskItem.classList.add('overdue');
        }

        taskItem.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="task-content">
                        <div class="task-title">${task.title}</div>
                        <div class="task-description">${task.description}</div>
                        <div class="task-date">Due: ${task.dueDate}</div>

                        ${task.assignedTo
                            ? `<div class="task-date">Assigned to: ${task.assignedTo}</div>`
                            : ''
                        }

                        ${isOverdue
                            ? `<div class="text-danger fw-bold">OVERDUE</div>`
                            : ''
                        }
                    </div>

                    <div class="task-actions">
                        <button 
                            class="btn btn-success btn-sm"
                            onclick="completeTask(${task.id})"
                            ${task.completed ? 'disabled' : ''}
                        >
                            ${task.completed ? 'Completed' : 'Complete'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

// Add a new task
function addTask(event) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDate').value;
    const assignedTo = document.getElementById('taskAssignee').value;

    const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        dueDate: dueDate,
        assignedTo: assignedTo,
        completed: false
    };

    tasks.push(newTask);

    document.getElementById('taskForm').reset();

    renderTasks();
}

// Mark a task as completed
function completeTask(taskId) {
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        task.completed = true;
        renderTasks();
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();

    const taskForm = document.getElementById('taskForm');

    taskForm.addEventListener('submit', addTask);
});

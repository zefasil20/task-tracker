const tasks = [];
let nextTaskId = 1;

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");

function renderTasks() {
  taskList.replaceChildren();

  const orderedTasks = [
    ...tasks.filter((task) => !task.completed),
    ...tasks.filter((task) => task.completed),
  ];

  if (orderedTasks.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-state";
    emptyMessage.textContent = "No tasks yet. Add one to get started.";
    taskList.append(emptyMessage);
  }

  for (const task of orderedTasks) {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " task-item--completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.className = "task-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.id = `task-${task.id}`;
    checkbox.setAttribute(
      "aria-label",
      `${task.completed ? "Mark as pending" : "Mark as complete"}: ${task.description}`,
    );
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const label = document.createElement("label");
    label.className = "task-label";
    label.htmlFor = checkbox.id;
    label.textContent = task.description;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", `Delete task: ${task.description}`);
    deleteButton.innerHTML =
      '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M10 11v6m4-6v6M5.5 7l1 14h11l1-14M9 7V4h6v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>';
    deleteButton.addEventListener("click", () => {
      const taskIndex = tasks.findIndex((item) => item.id === task.id);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        renderTasks();
      }
    });

    item.append(checkbox, label, deleteButton);
    taskList.append(item);
  }

  const remainingTasks = tasks.filter((task) => !task.completed).length;
  taskCount.textContent =
    tasks.length === 0
      ? ""
      : `${remainingTasks} ${remainingTasks === 1 ? "task" : "tasks"} remaining`;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const description = taskInput.value.trim();
  if (!description) {
    taskInput.focus();
    return;
  }

  tasks.push({ id: nextTaskId++, description, completed: false });
  taskInput.value = "";
  renderTasks();
  taskInput.focus();
});

renderTasks();

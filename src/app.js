const API = `http://localhost:3000/todos`;

const todoList = document.getElementById("todo-list");
const todoFrom = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");

const filterAllBtn = document.getElementById("filter-all");
const filterActiveBtn = document.getElementById("filter-active");
const filterCompletedBtn = document.getElementById("filter-completed");

let currentFilter = "all"; //all | active | completed

//Load todos with fetch api with filtering

async function loadTodos() {
  let url = API;
  if (currentFilter === "active") {
    url += "?isCompleted=false";
    console.log(url);
  } else if (currentFilter === "completed") {
    url += "?isCompleted=true";
  }

  try {
    const res = await fetch(url);
    const todos = await res.json();
    renderTodos(todos);
  } catch (error) {
    todoList.innerHTML = `<li class="text-red-600">Failed to fetch</li>`;
    console.log(error);
  }
}

// Render todos in dom
function renderTodos(todos) {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = `<li>No Todos found with this filter</li>`;
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "flex item-center gap-3";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.className = "w-5 h-5 curosr-pointer";

    // Todo: add event listener in the checkbox for toggling the isCompleted flag
    checkbox.addEventListener("change", () => {
      toggleIsCompleted(todo.id, checkbox.checked);
    });

    //title
    const lfetDiv = document.createElement("div");
    lfetDiv.className = "flex item-center gap-3";

    const title = document.createElement("span");
    title.textContent = todo.title;
    title.className = todo.isCompleted ? "line-through text-gray-500" : "";

    lfetDiv.appendChild(checkbox);
    lfetDiv.appendChild(title);

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete Todo";
    delBtn.className =
      "bg-red-500 text-white px-3 py-1 rounded hover:big-red-600";

    delBtn.addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    li.appendChild(lfetDiv);
    li.appendChild(delBtn);

    todoList.append(li);
  });
}

async function toggleIsCompleted(todoId, isCompleted) {
  await fetch(`${API}/${todoId}`, {
    method: "PATCH",
    body: JSON.stringify({ isCompleted }),
    headers: {
      "Content-type": "application/json",
    },
  });

  await loadTodos();
}

async function deleteTodo(todoId) {
  await fetch(`${API}/${todoId}`, {
    method: "DELETE",
  });

  await loadTodos();
}

todoFrom.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = todoInput.value.trim();

  if (!title) return;

  await fetch(API, {
    method: "POST",
    body: JSON.stringify({
      title,
      isCompleted: false,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  await loadTodos();

  todoInput.value = "";
});

filterAllBtn.addEventListener("click", async () => {
  currentFilter = "all";
  setActiveFilterBtn();
  await loadTodos();
});
filterActiveBtn.addEventListener("click", async () => {
  currentFilter = "active";
  setActiveFilterBtn();
  await loadTodos();
});
filterCompletedBtn.addEventListener("click", async () => {
  currentFilter = "completed";
  setActiveFilterBtn();
  await loadTodos();
});

function setActiveFilterBtn() {
  // Remove active styles from all buttons
  filterAllBtn.classList.remove("bg-blue-500", "text-white");
  filterActiveBtn.classList.remove("bg-blue-500", "text-white");
  filterCompletedBtn.classList.remove("bg-blue-500", "text-white");
  filterAllBtn.classList.remove("bg-gray-300", "text-black");
  filterActiveBtn.classList.remove("bg-gray-300", "text-black");
  filterCompletedBtn.classList.remove("bg-gray-300", "text-black");

  filterAllBtn.classList.add(
    currentFilter === "all" ? "bg-blue-500" : "bg-gray-300"
  );
  filterAllBtn.classList.add(
    currentFilter === "all" ? "text-white" : "text-black"
  );
  filterActiveBtn.classList.add(
    currentFilter === "active" ? "bg-blue-500" : "bg-gray-300"
  );
  filterActiveBtn.classList.add(
    currentFilter === "active" ? "text-white" : "text-black"
  );
  filterCompletedBtn.classList.add(
    currentFilter === "completed" ? "bg-blue-500" : "bg-gray-300"
  );
  filterCompletedBtn.classList.add(
    currentFilter === "completed" ? "text-white" : "text-black"
  );
}

setActiveFilterBtn();

loadTodos();

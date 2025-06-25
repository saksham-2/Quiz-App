// To-Do App Functionality
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

function createTodoItem(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Toggle complete on click
    li.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-btn')) return;
        li.classList.toggle('completed');
    });

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', function () {
        li.remove();
    });
    li.appendChild(removeBtn);

    return li;
}

addTodoBtn.addEventListener('click', function () {
    const task = todoInput.value.trim();
    if (task) {
        const todoItem = createTodoItem(task);
        todoList.appendChild(todoItem);
        todoInput.value = '';
        todoInput.focus();
    }
});

todoInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTodoBtn.click();
    }
}); 
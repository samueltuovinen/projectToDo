// Select todo-form
const todoForm = document.querySelector('.todo-form');
// Select the input box
const todoInput = document.querySelector('.todo-input');
// Select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.todo-items');

// array hich stores every todos
let todos = [];

// Add eventListener on form, and listen for submit event 
todoForm.addEventListener('submit', function(event) {
    // Prevent the page from reloading when submitting the form
    event.preventDefault();
    addTodo(todoInput.value); // call addTodo function with input box current value
});

// Function to add todo
function addTodo(item) {
    // if item is not empty
    if (item !== '') {
        // Make a todo object, which has id, name, and completed properties
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        // Then add it to todos array
        todos.push(todo);
        renderTodos(todos); 

        // finally clear the input box value
        todoInput.value = '';
    }
}

// Function to render given todos to screen
function renderTodos(todos) {
    // Clear everything inside <ul> with class="todo-items"
    todoItemsList.innerHTML = '';

    // Run through each items inside todos
    todos.forEach(function(item) {
        // Check if item is completed
        const checked = item.completed ? 'checked': null;

    // Make a <li> element and fill it
        // <li> </li>
        const li = document.createElement('li');
        // <li class="item"> </li>
        li.setAttribute('class', 'item');
        // <li class="item" data-key="1594003133171"> </li>
        li.setAttribute('data-key', item.id);
        /* <li class="item" data-key="1594003133171">
                <input class="checkbox" type="checkbox">
                Milk
                <button class="delete-button">X</button>
            </li> */
        // If item is completed, then add a class to <li> called 'checked', which will add line-through style
        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class="delete-button">X</button>
            `;
            // finally add the <li> to the <ul>
            todoItemsList.append(li);
        });
}

// Function to add todos to local storage
function addToLocalStorage(todos) {
    // conver the array to string then store it
    localStorage.setItem('todos', JSON.stringify(todos));
    // Render them to screen
    renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage {
    const reference = localStorage.getItem('todos');
    // if reference exists
    if (reference) {
        // Convert back to array and store it in todos array
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

// initially get everything from localStorage
getFromLocalStorage();

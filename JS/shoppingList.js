// Select todo-form
const shoplistForm = document.getElementById('shoplist-form');
// Select the input box
const shoplistInput = document.getElementById('shoplist-input');
// Select the <ul> with class="todo-items"
const shoplistItems = document.getElementById('shoplist-items');

// array hich stores every todos
let shopitems = [];

// Add eventListener on form, and listen for submit event 
shoplistForm.addEventListener('submit', function(event) {
    // Prevent the page from reloading when submitting the form
    event.preventDefault();
    addShoplist(shoplistInput.value); // call addTodo function with input box current value
});

// Function to add todo
function addShoplist(item) {

    // if item is not empty
    if (item !== '') {
        // Make a todo object, which has id, name, and completed properties
        const shoplist = {
            id: Date.now(),
            name: item,
            completed: false
        };

        // Then add it to todos array
        shopitems.push(shoplist);
        addToLocalStorage(shopitems); 

        // finally clear the input box value
        shoplistInput.value = '';
        shoplistInput.style.border = "none";
    } else {
        alert("Field is empty");
        shoplistInput.style.border = "3px solid red";
    }
}

// Function to render given todos to screen
function renderShoplist(shopitems) {
    // Clear everything inside <ul> with class="todo-items"
    shoplistItems.innerHTML = '';

    // Run through each items inside todos
    shopitems.forEach(function(item) {
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
            shoplistItems.append(li);
        });
}

// Function to add todos to local storage
function addToLocalStorage(shopitems) {
    // conver the array to string then store it
    localStorage.setItem('shopitems', JSON.stringify(shopitems));
    // Render them to screen
    renderShoplist(shopitems);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('shopitems');
    // if reference exists
    if (reference) {
        // Convert back to array and store it in todos array
        shopitems = JSON.parse(reference);
        renderShoplist(shopitems);
    }
}

// toggle the value to completed and not completed
function toggle(id) {
    shopitems.forEach(function(item) {
        // Use == not ===, because here types are different. One is number and other is string
        if (item.id == id) {
            // toggle the value
            item.completed = !item.completed;
        }
    });

addToLocalStorage(shopitems);
}

// Deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteShopItem(id) {
    // Filters out the <li> with the id and updates the todos array
    shopitems = shopitems.filter(function (item) {
        return item.id != id;
    });

// Update the localStorage
addToLocalStorage(shopitems);
}

// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
shoplistItems.addEventListener('click', function(event) {
    // Check if the event is on checkbox
    if (event.target.type === 'checkbox') {
        // toggle the state
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    // Check if that is delete-button
    if (event.target.classList.contains('delete-button')) {
        // get id from data-key attribute's value of parent <li> where the delete butto is present
        deleteShopItem(event.target.parentElement.getAttribute('data-key'));
    }
});



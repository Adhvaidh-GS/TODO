const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector(".todo-list");
const filterOption =  document.querySelector(".filter-todo");


document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);

function addTodo(event) {
    // Preventing form from submitting
    event.preventDefault();

    // Creating a div which apppears once the submit button is clicked
    // Creating Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Adding todo to localstorage
    saveLocalTodos(todoInput.value)
    // Complete button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Delete button 
    const DeletedButton = document.createElement('button');
    DeletedButton.innerHTML = '<i class="fas fa-trash"></i>'
    DeletedButton.classList.add("trash-btn");
    todoDiv.appendChild(DeletedButton);
    // Appending to list
    todoList.appendChild(todoDiv);
    // Clear todo input value
    todoInput.value = ""

}

function deleteCheck(e) {
    const item = e.target;
    // Delete TODO
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove()
        })
    }

    // Check TODO
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }


}

function saveLocalTodos(todo){
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.push(todo);
     localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos(){
    console.log('Hello')
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // Creating Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Complete button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Delete button 
    const DeletedButton = document.createElement('button');
    DeletedButton.innerHTML = '<i class="fas fa-trash"></i>'
    DeletedButton.classList.add("trash-btn");
    todoDiv.appendChild(DeletedButton);
    // Appending to list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

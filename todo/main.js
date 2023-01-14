const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('.todo-list')
const editForm = document.querySelector('.edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEdit = document.querySelector('.cancel-edit')

let oldInputValue = ''


const saveTodo = (text) => {
    const todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTitle = document.createElement('h3')
    todoTitle.classList.add('todo-title')
    todoTitle.innerHTML = text

    todo.appendChild(todoTitle)

    const doneBtn = document.createElement('button')
    doneBtn.classList.add('button')
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML = '<i class="bi bi-check-lg"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement('button')
    editBtn.classList.add('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>'
    todo.appendChild(editBtn)

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('button')
    removeBtn.classList.add('remove-todo')
    removeBtn.innerHTML = '<i class="bi bi-x"></i>'
    todo.appendChild(removeBtn)

    todoList.appendChild(todo)
    todoInput.value = ''
    todoInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerHTML === oldInputValue){
            todoTitle.innerHTML = text
        }
    })
}

todoForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputValue = todoInput.value

    if(inputValue){
        saveTodo(inputValue)
    }
})


document.addEventListener('click', (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest('div')
    let todoTitle = ''

    if(parentEl && parentEl.querySelector('h3')){
        todoTitle = parentEl.querySelector('h3').innerHTML
    }

    if(targetEl.classList.contains('finish-todo')){
        parentEl.classList.toggle('done')
    }

    if(targetEl.classList.contains('remove-todo')){
        parentEl.remove()
    }

    if(targetEl.classList.contains('edit-todo')){
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

cancelEdit.addEventListener('click', toggleForms)

editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForms()
})
const AddForm = document.querySelector('.add-form')
const AddInput = document.querySelector('#add-input')
const todo = document.querySelector('.todo')

let oldInputValue = ''

const mounths = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]

const addZero = (num) => {
    if(num < 10){
        return '0' + num
    } else{
        return num
    }
}

const addTask = (task) => {
    let now = new Date()
    let year = now.getFullYear()
    let mounth = now.getMonth()
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()

    const container = document.createElement('tr')

    const taskTitle = document.createElement('td')
    taskTitle.classList.add('task-title')
    taskTitle.innerHTML = task
    container.appendChild(taskTitle)

    const tdEdit = document.createElement('td')
    tdEdit.classList.add('hide')
    const editInputArea = document.createElement('form')
    editInputArea.classList.add('input-edit')
    const editInput = document.createElement('input')
    editInput.type = 'text'
    tdEdit.appendChild(editInputArea)
    editInputArea.appendChild(editInput)
    container.appendChild(tdEdit)

    const taskDate = document.createElement('td')
    taskDate.innerHTML = `${day} de ${mounths[mounth]} de ${year}  ${addZero(hour)}:${addZero(minutes)}`
    container.appendChild(taskDate)

    const options = document.createElement('td')
    const selectOptions = document.createElement('select')
    const option1 = document.createElement('option')
    option1.value = 'pendente'
    option1.innerHTML = 'Pendente'
    const option2 = document.createElement('option')
    option2.value = 'em andamento'
    option2.innerHTML = 'Em Andamento'
    const option3 = document.createElement('option')
    option3.value = 'concluido'
    option3.innerHTML = 'Concluído'
    selectOptions.appendChild(option1)
    selectOptions.appendChild(option2)
    selectOptions.appendChild(option3)
    options.appendChild(selectOptions)
    container.appendChild(options)

    const buttonsArea = document.createElement('td')
    const editBtn = document.createElement('button')
    editBtn.classList.add('btn-action')
    editBtn.classList.add('edit-btn')
    editBtn.innerHTML = "<i class='bx bxs-pencil edit-btn'></i>"
    const removeBtn = document.createElement('button')
    removeBtn.classList.add('btn-action')
    removeBtn.classList.add('remove-btn')
    removeBtn.innerHTML = "<i class='bx bxs-trash remove-btn'></i>"
    buttonsArea.appendChild(editBtn)
    buttonsArea.appendChild(removeBtn)
    container.appendChild(buttonsArea)

    todo.appendChild(container)
}

const AddFormEvent = (e) => {
    e.preventDefault()

    if(AddInput.value !== ''){
        addTask(AddInput.value)
    }
    AddInput.value = ''
}

AddForm.addEventListener('submit', AddFormEvent)

document.addEventListener('click', (e) => {

    const targetEl = e.target
    const parentEl = e.target.closest('tr')
    
    if(targetEl.classList.contains('remove-btn')){
        parentEl.remove()
    }

    if(targetEl.classList.contains('edit-btn')){
        const buttonsEl = targetEl.closest('td')
        const containerEl = buttonsEl.parentNode

        const taskTitle = containerEl.children[0]
        const editInputArea = containerEl.children[1]
        const editInput = editInputArea.querySelector('input')
        const editForm = editInputArea.querySelector('form')

        oldInputValue = taskTitle.innerHTML
        editInput.value = oldInputValue

        taskTitle.classList.toggle('hide')
        editInputArea.classList.toggle('hide')

        editForm.addEventListener('submit', (e) => {
            e.preventDefault()

            taskTitle.classList.toggle('hide')
            editInputArea.classList.toggle('hide')

            taskTitle.innerHTML = editInput.value
        })
    }
})


window.addEventListener('load', function () {
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    const username = localStorage.getItem('username') || '';
    nameInput.value = username;
    //when i tried to change in input tab by change event listener it will store the value in local storage in key = username
    nameInput.addEventListener('change', function () {
        localStorage.setItem('username', nameInput.value);
    })
    newTodoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const todo = {
            // here the content and category is name of the input tags
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,            
        }
        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })
    DisplayTodos();
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    document.getElementById('date').innerHTML = `${day}-${month}-${year}`;
    console.log(`${day}-${month}-${year}`);
})

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        const parent = document.createElement('div');
        const para = document.createElement('p');
        todoItem.classList.add('todo-item');
        const label = document.createElement('label');
        const input = document.createElement('input');
        // const span = document.createElement('button');
        const content = document.createElement('div')
        const actions = document.createElement('div')
        const edit = document.createElement('button')
        const deleteButton = document.createElement('button');
        input.classList.add('type-check');
        input.type = 'checkbox';
        input.checked = todo.done;
        // span.classList.add('bubble');
        if (todo.category == 'personal') {
            para.innerHTML = 'Personal';
            para.classList.add('type-todo-personal');
        }
        else {
            para.innerHTML = 'Business';
            para.classList.add('type-todo-business');
        }
        content.classList.add('todo-content');
        parent.classList.add('parent-item');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'edit';
        deleteButton.innerHTML = 'delete';
        parent.appendChild(todoItem);
        parent.appendChild(para);
        label.appendChild(input);
        // label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoList.appendChild(parent);
        //adding scrolling effect to the input if length greater than 22 words
        let inputE1 = content.firstElementChild;
        let max_length = 22;
        if (inputE1.value.length > max_length) {
            inputE1.classList.add('word-scroll');
        }

        if (todo.done) {
            todoItem.classList.add('done')
        }
        input.addEventListener('click', function (e) {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos))
            if (todo.done) {
                todoItem.classList.add('done');
            }
            else {
                todoItem.classList.remove('done')
            }
            DisplayTodos();

        })
        let button_click = false;
        edit.addEventListener('click', function (e) {
            button_click = !button_click;
            const input = content.querySelector('input');
            if (button_click) {
                input.removeAttribute('readonly');
                input.focus();
                setTimeout(() => {
                    edit.innerHTML = 'done';
                    edit.style.backgroundColor = '#00ff00'

                }, 800);
            }
            else {
                input.setAttribute('readonly', true);
                todo.content = input.value;
                edit.innerHTML = 'edit'
                edit.style.backgroundColor = '#EA40A4'
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            }


        })
        deleteButton.addEventListener('click', function (e) {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })

    });
}
// declaring display function
// function DisplayTodos() {
//     let todoList = document.querySelector('#todo-list');
//     let response = JSON.parse(localStorage.getItem('todos'));
//     // todoList.innerHTML = '';
//     let todoElementE1;
//     for (let i = 0; i < todos.length; i++) {
//         todoElementE1 += `
//         <div class="todo-item">
//                     <label>
//                         <input type="checkbox">
//                         <span class="bubble personal"></span>
//                     </label>
//                     <div class="todo-content">
//                         <input type="text" name="todo-content" value="${response[i].content}" readonly>

//                     </div>
//                     <div class="actions">
//                         <button class="edit">Edit</button>
//                         <button class="delete">Delete</button>
//                     </div>
//                 </div>
//         `
//         todoList.innerHTML = todoElementE1;
//     }

// }




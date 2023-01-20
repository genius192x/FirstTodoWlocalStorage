
let todos;
todos = JSON.parse(localStorage.getItem('todos')) || [];
const newTodoForm = document.querySelector('#new-todo-form');
const userName = localStorage.getItem('userName') || [];


newTodoForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const todo = {
		text: e.target.elements.content.value,
		done: false,
	}
	if (todo.text) {
		todos.push(todo);
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	e.target.reset();
	renderTodo()
})
renderTodo()

function renderTodo() {
	const todoList = document.querySelector('.todo__list');
	todoList.innerHTML = "";
	todos.forEach((todo, index) => {
		const todoItem = document.createElement('div');
		todoItem.classList.add("todo__item");
		todoItem.innerHTML = '';


		const todoForm = document.createElement('form')
		todoForm.classList.add('form')


		const inputChec = document.createElement('input');
		inputChec.classList.add('input__chec');
		inputChec.setAttribute("type", "checkbox")
		inputChec.setAttribute("id", index)
		inputChec.checked = todo.done;


		const label = document.createElement('label')
		label.classList.add('checkbox__label')
		label.setAttribute("for", index)


		const input = document.createElement("input");
		input.setAttribute("value", todo.text)
		input.setAttribute("type", "text")
		input.classList.add('todo__text')
		input.setAttribute('readonly', "")
		input.innerHTML = `<input value="${todo.text}" type="text" class="todo__text" readonly></input>`



		const todoActions = document.createElement('div');
		todoActions.classList.add("todo__actions")



		const deleteBtn = document.createElement('button');
		deleteBtn.classList.add("todo__del", "todo-btn")


		const editBtn = document.createElement('div');
		editBtn.classList.add("todo__edit", "todo-btn")



		deleteBtn.innerHTML = "Delete";
		editBtn.innerHTML = "Edit";
		todoForm.appendChild(inputChec);
		todoForm.appendChild(label);
		todoItem.appendChild(todoForm);
		todoItem.appendChild(input);
		todoActions.appendChild(editBtn);
		todoActions.appendChild(deleteBtn);



		todoItem.appendChild(todoActions);
		todoList.appendChild(todoItem)

		if (todo.done) {
			todoItem.classList.add('done')
		}

		inputChec.addEventListener('click', (e) => {



			todo.done = e.currentTarget.checked;

			localStorage.setItem('todos', JSON.stringify(todos));
			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}
			renderTodo()
		})
		editBtn.addEventListener('click', (e) => {
			const input = todoItem.querySelector('.todo__text');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', e => {
				input.setAttribute('readonly', "")
				if (e.currentTarget.value) {
					todo.text = e.currentTarget.value;
				}


				localStorage.setItem('todos', JSON.stringify(todos));
				renderTodo();
			})
		});
		deleteBtn.addEventListener('click', e => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			renderTodo();
		})

	});

}


const userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];
let authWrap = document.querySelector('.authorization');
const newUser = document.querySelector('.user__form');
const nameUserInput = document.querySelector('.authorization__name');
const avatars = document.querySelectorAll('.avatar');

if (userInfo.length > 0) {
	authWrap.remove();
	let mainWrap = document.querySelector('.main__app');

	mainWrap.style.transition = "all 0s ease 0s"
	mainWrap.style.transform = "translate(0,0)"
}

for (let i = 0; i < avatars.length; i++) {
	avatars[i].addEventListener('click', function () {
		for (let i = 0; i < avatars.length; i++) {
			avatars[i].parentElement.classList.remove('active');
		}
		this.parentElement.classList.add('active');
	})
}
let avatar;
window.addEventListener('click', e => {
	if (e.target.classList.contains('avatar')) {
		avatar = e.target.getAttribute('src');
	}

})
newUser.addEventListener('submit', (e) => {
	e.preventDefault();


	const User = {
		name: e.target.elements.nameUser.value,
		avatar: avatar,
	}
	if (User.name) {
		userInfo.push(User);
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		let authWrap = document.querySelector('.authorization');
		authWrap.style.transform = "translate(-100%,0)"
		let mainWrap = document.querySelector('.main__app');
		mainWrap.style.transform = "translate(0,0)"
		setTimeout(authWrap.remove(), 1000)

	}

	getUserInfo()
})

const logoutBtn = document.querySelector('.actions__logout');
logoutBtn.addEventListener('click', () => {
	localStorage.clear('userInfo');
	window.location.reload();
})

// ниже все что связано с главной страницей todo
let todos;
todos = JSON.parse(localStorage.getItem('todos')) || [];
const newTodoForm = document.querySelector('#new-todo-form');
// const userName = localStorage.getItem('userName') || [];
function getUserInfo() {
	const userData = JSON.parse(localStorage.getItem('userInfo')) || [];
	const userInfo = userData[0];

	const avatar = document.querySelector('.header__avatar');
	const mainTitle = document.querySelector('.main__title');
	if (userData.length > 0) {
		mainTitle.innerHTML = `Hello, ${userInfo.name}`
		avatar.innerHTML = `<img class="main__avatar" src="./${userInfo.avatar}" alt="">`
	}

}
getUserInfo()
//add tasks counter
const counter = document.querySelector('.tasks-counter');
counter.innerHTML = todos.length || '0';

//add current date
let date = new Date();
let fullDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
const dateWrap = document.querySelector('.date__wrap');
dateWrap.innerHTML = fullDate;

//add couter for todoDone
const tasksDoneCountWrap = document.querySelector('.quantitydone');
function countDone() {

	let todoDone = todos.filter(todo => todo.done);

	tasksDoneCountWrap.innerHTML = `${todoDone.length} done`;
}
countDone()

const filterOptions = document.querySelector(".filter-todos");

filterOptions.addEventListener("change", (e) => {

	const todos = document.querySelector('.todo__list').childNodes;
	todos.forEach(todo => {


		switch (e.target.value) {
			case 'All':
				todo.style.display = "flex";
				break;
			case 'Active':
				if (todo.classList.contains("done")) {
					todo.style.display = "none";
				} else {
					todo.style.display = "flex";
				}
				break;
			case 'Done':
				if (todo.classList.contains("done")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}


	})

})

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
	countDone()
	counter.innerHTML = todos.length
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
			countDone()
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
			counter.innerHTML = todos.length
			countDone()
		})

	});

}


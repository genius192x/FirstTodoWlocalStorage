let userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];
let authWrap = document.querySelector('.authorization');
const newUser = document.querySelector('.user__form');
const nameUserInput = document.querySelector('.authorization__name');

let mainWrap = document.querySelector('.main__app');

if (userInfo.length > 0) {
	// authWrap.remove();
	let mainWrap = document.querySelector('.main__app');
	authWrap.style.transition = "all 0s ease 0s"
	authWrap.style.transform = "translate(-110%,0)"
	mainWrap.style.transition = "all 0s ease 0s"
	mainWrap.style.transform = "translate(0,0)"
}
let avatars;

function addActiveAvatar() {

	let avatars = document.querySelectorAll('.avatar');
	for (let i = 0; i < avatars.length; i++) {
		avatars[i].addEventListener('click', function () {
			for (let i = 0; i < avatars.length; i++) {
				avatars[i].parentElement.classList.remove('active');
			}
			this.parentElement.classList.add('active');
		})
	}
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
	if (User.name && User.avatar) {
		userInfo.push(User);
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		// let authWrap = document.querySelector('.authorization');
		authWrap.style.transition = "all 0.5s ease 0s"
		authWrap.style.transform = "translate(-110%,0)"

		mainWrap.style.transform = "translate(0,0)"
		// setTimeout(authWrap.remove(), 1000)

	} else if (!User.name) {
		alert("Напишите свое имя")
	} else if (!User.avatar) {
		alert("Выберите аватар")
	}

	getUserInfo()
})
let todos;
todos = JSON.parse(localStorage.getItem('todos')) || [];
const logoutBtn = document.querySelector('.actions__logout');
logoutBtn.addEventListener('click', () => {
	const avatars = document.querySelector('.avatars');
	localStorage.clear();
	userInfo = [];

	authWrap.style.transition = "all 0.5s ease 0s"
	authWrap.style.transform = "translate(0%,0)"
	mainWrap.style.transition = "all 0.5s ease 0s"
	mainWrap.style.transform = "translate(110%,0)"
	nameUserInput.value = '';

	for (let i = 0; i < avatars.length; i++) {

		for (let i = 0; i < avatars.length; i++) {
			avatars[i].parentElement.classList.remove('active');
		}


	}

	todos = [];
	// window.location.reload();
})

// ниже все что связано с главной страницей todo

const newTodoForm = document.querySelector('#new-todo-form');
// const userName = localStorage.getItem('userName') || [];
function getUserInfo() {
	const userData = JSON.parse(localStorage.getItem('userInfo')) || [];
	const userInfo = userData[0];

	const avatar = document.querySelector('.header__avatar');
	const mainTitle = document.querySelector('.main__title');
	if (userData.length > 0) {
		mainTitle.innerHTML = `Привет, ${userInfo.name}`
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

//add counter for todoDone
const tasksDoneCountWrap = document.querySelector('.quantitydone');
function countDone() {

	let todoDone = todos.filter(todo => todo.done);

	tasksDoneCountWrap.innerHTML = `${todoDone.length} сделано`;
}
countDone()

const filterOptions = document.querySelector(".filter-todos");

filterOptions.addEventListener("change", (e) => {

	const todos = document.querySelector('.todo__list').childNodes;
	todos.forEach(todo => {


		switch (e.target.value) {
			case 'All':
				todo.style.display = "flex";

				counter.innerHTML = todos.length || '0';
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
				const todosArr = Array.from(todos)
				const todosFilter = todosArr.filter(function (item) {
					if (item.classList.contains('done')) {

					}
				})


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

		todos.unshift(todo);

		renderTodo()
		const todoItem = document.querySelector('.todo__item');

		todoItem.style.animation = 'normal animItemAdd 0.5s ease-out';
		function removeStyle() {
			todoItem.style.removeProperty("animation");

		}

		localStorage.setItem('todos', JSON.stringify(todos));
	}
	setTimeout(removeStyle, 1000)
	e.target.reset();


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



		const textarea = document.createElement("textarea");
		textarea.setAttribute("value", todo.text)
		// textarea.setAttribute("type", "text")
		textarea.classList.add('todo__text')
		textarea.classList.add('hidden')
		// textarea.setAttribute('cols', "90");
		textarea.setAttribute('rows', "3");
		textarea.innerText = todo.text;
		// input.setAttribute('readonly', "")
		// input.innerHTML = `<input value="${todo.text}" type="text" class="todo__text" readonly></input>`
		const parag = document.createElement("p");
		parag.classList.add('todo__text_p')
		parag.innerText = todo.text




		const todoActions = document.createElement('div');
		todoActions.classList.add("todo__actions")



		const deleteBtn = document.createElement('button');
		deleteBtn.classList.add("todo__del", "todo-btn")


		const editBtn = document.createElement('button');
		editBtn.classList.add("todo__edit", "todo-btn")



		deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
		editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
		todoForm.appendChild(inputChec);
		todoForm.appendChild(label);
		todoItem.appendChild(todoForm);
		todoItem.appendChild(textarea);
		todoItem.appendChild(parag);
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
		parag.addEventListener('click', (e) => {
			const input = todoItem.querySelector('.todo__text');
			const paragraph = todoItem.querySelector('.todo__text_p');
			input.classList.toggle("hidden");
			paragraph.classList.toggle("hidden")
			textarea.focus();
		})
		const input = todoItem.querySelector('.todo__text');
		const paragraph = todoItem.querySelector('.todo__text_p');


		input.addEventListener('blur', e => {
			textarea.classList.toggle("hidden");
			paragraph.classList.toggle("hidden")
			// parag.innerText = e.currentTarget.value
			if (e.currentTarget.value) {
				todo.text = e.currentTarget.value;
			}


			localStorage.setItem('todos', JSON.stringify(todos));
			renderTodo();
		})
		textarea.addEventListener('click', (e) => {

		});
		deleteBtn.addEventListener('click', e => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));

			console.log(todoItem);

			todoItem.style.animation = ' animItemDel alternate  0.5s ease-out ';
			function removeStyle() {
				todoItem.style.removeProperty("animation");

			}
			setTimeout(removeStyle, 500)
			setTimeout(renderTodo, 500)



			counter.innerHTML = todos.length
			countDone()
		})

	});

}
//========================================================================================================================================================
async function getAvatrs() {
	const file = "js/avatars.json";
	let response = await fetch(file, {
		method: "GET"
	});
	if (response.ok) {
		let result = await response.json();
		const avatars = document.querySelector('.avatars');
		result.avatars.forEach(avatar => {
			const markup = `<div class="avatars__image"><img class="avatar" src="img/${avatar.src}" alt=""></div>`
			avatars.insertAdjacentHTML("beforeend", markup)
		})
		addActiveAvatar()

	} else {
		alert("Ошибка")
	}
}
function renderAvatars() {

}
getAvatrs()
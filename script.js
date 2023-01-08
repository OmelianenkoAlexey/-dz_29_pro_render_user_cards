// ! ДЗ 29. Рендеринг карточек юзеров системы

// Исходный код проекта находится в архиве code.zip
// Файл script.js содержит данные:

// users – массив юзеров системы.
// roles – объект ролей юзера.
// gradation – объект с диапазоном оценок.

// Что нужно сделать: отрендерить для каждого юзера с массива users соответствующего вида блок.
// Для каждого юзера в блоке выводим:

// Картинку юзера – свойство img
// Имя юзера – свойство name
// Возраст юзера – свойство age
// Роль юзера – свойство role.
const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "image/man.svg",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "image/man.svg",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "image/man.svg",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "image/man.svg",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "image/man.svg",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 53,
		img: "image/man.svg",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 15,
				"studentsScore": 45
			},
			{
				"title": "Java Enterprise",
				"score": 70,
				"studentsScore": 86
			},
		]
	}
];

const roles = {
	admin: "image/admin.svg",
	student: "image/student.svg",
	lector: "image/lector.svg"
};

const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};
// Если у юзера свойство courses есть, то выводим перечень пройденных курсов.
// Делаем основной класс User, в котором будет созданы метод render и renderCourses.
// Для каждой роли делаем свой класс Student, Lector, Admin, который наследует класс User.
// В классах Lector, Admin переопределяем метод renderCourses для того, что бы в нужном виде отобразить список курсов.
// Заданную html - разметку и css - классы для каждого блока можете править как хотите) Главное – визуально отобразить так, как на картинке.
let list = [];
let elem = [];

function upString(item) {
	let slovo = "";
	for (let i = 0; i < item.length; i++) {
		if (i === 0) {
			slovo = slovo + item[i].toUpperCase();
		} else if (item[i - 1] === "-") {
			slovo = slovo + item[i].toUpperCase();
		} else {
			slovo = slovo + item[i];
		}
	}
	return slovo.replace("-", " ");
}

function numbers(item, grad) {
	let status;
	if (item <= 20) {
		status = grad[20];
	} else if (item > 20 && item <= 55) {
		status = grad[55];
	} else if (item > 55 && item <= 85) {
		status = grad[85];
	} else if (item > 85 && item <= 100) {
		status = grad[100];
	};
	return status;
}

class User {
	constructor(name, age, img, role, courses) {
		this.name = name;
		this.age = age;
		this.img = img;
		this.role = role;
		this.courses = courses;
	}

	renderCourses(rol, grad) {
		elem = [];
		this.courses.forEach((item) => {
			elem.push(`
			    <p class="user__courses--course ${this.role}">
			        ${item.title} <span class="${numbers(item.mark, gradation)}">${upString(numbers(item.mark, gradation))}</span>
			    </p>
			`)
		});
	};
	render(rol, grad) {
		let nameAdmin = "";
		if (this.role !== "student") {
			nameAdmin = "admin--info";
		}
		list.push(`
		<div class="user">
            <div class="user__info">
                <div class="user__info--data">
                    <img src="${this.img}" alt="${this.name}" height="50">
                    <div class="user__naming">
                        <p>Name: <b>${this.name}</b></p>
                        <p>Age: <b>${this.age}</b></p>
                    </div>
                </div>
                <div class="user__info--role ${this.role}">
                    <img src="${rol.student}" alt="${this.role}" height="25">
                    <p>${this.role}</p>
                </div>
            </div>
				<div class="user__courses ${nameAdmin}">
					${elem.join("")}
			    </div>
        </div>`)
		elem = [];
	};
}

class Student extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	}
}

class Lector extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	}

	renderCourses(rol, grad) {
		this.courses.forEach((item) => {
			elem.push(`
				<div class="user__courses--course ${this.role}">
					<p>Title: <b>${item.title}</b></p>
					<p>${upString(this.role)}'s score: <span class="${numbers(item.score, gradation)}">${upString(numbers(item.score, gradation))}</span></p>
					<p>Average student's score: <span class="${numbers(item.studentsScore, gradation)}">${upString(numbers(item.studentsScore, gradation))}</span></p>
				</div>
				`)
		});
	}
}

class Admin extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	}
	renderCourses(rol, grad) {
		this.courses.forEach((item) => {
			elem.push(`
				<div class="user__courses--course ${this.role}">
					<p>Title: <b>${item.title}</b></p>
					<p>${upString(this.role)}'s score: <span class="${numbers(item.score, gradation)}">${upString(numbers(item.score, gradation))}</span></p>
					<p>Lector: <b>${item.lector}</b></p>
				</div>
				`)
		});
	}
}

users
	.map((item) => {
		if (item.role === "student") {
			return new Student(item.name, item.age, item.img, item.role, item.courses);
		}
		if (item.role === "admin") {
			return new Admin(item.name, item.age, item.img, item.role, item.courses);
		}
		if (item.role === "lector") {
			return new Lector(item.name, item.age, item.img, item.role, item.courses);
		}
	})
	.forEach((item) => {
		if (item.courses) {
			item.renderCourses(roles, gradation);
		}
		item.render(roles, gradation);
	})

document.write(`<div class="users">${list.join("")}</div>`)


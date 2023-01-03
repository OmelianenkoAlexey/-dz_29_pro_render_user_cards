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
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 86
			}
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
class User {
	constructor(name, age, img, role, courses) {
		this.name = name;
		this.age = age;
		this.img = img;
		this.role = role;
		this.courses = courses;
	}

	render(rol, grad) {
		let elem = [];
		if (this.courses) {
			this.courses
				.forEach(function (item) {
					let status;
					if (item.mark <= 20) {
						status = "satisfactory";
					} else if (item.mark > 20 && item.mark <= 55) {
						status = "good";
					} else if (item.mark > 55 && item.mark <= 85) {
						status = "very-good";
					} else if (item.mark > 85 && item.mark <= 100) {
						status = "excellent";
					}
					elem.push(`
			    <p class="user__courses--course {this.role.toLowerCase()}">
			        ${item.title} <span class="${status}">${upString(status)}</span>
			     </p>
			`)
				})
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
                <div class="user__info--role ${this.role.toLowerCase()}">
                    <img src="${rol.student}" alt="${this.role.toLowerCase()}" height="25">
                    <p>${this.role}</p>
                </div>
            </div>
				    <div class="user__courses">
			${elem.join("")}
			    </div>
        </div>`)
		return list;
	}

	renderCourses(rol, grad) {
		let rol_1 = this.role;
		let elem = [];

		if (this.role === "admin") {
			if (this.courses) {
				this.courses
					.forEach(function (item) {
						let status;
						if (item.score <= 20) {
							status = "satisfactory";
						} else if (item.score > 20 && item.score <= 55) {
							status = "good";
						} else if (item.score > 55 && item.score <= 85) {
							status = "very-good";
						} else if (item.score > 85 && item.score <= 100) {
							status = "excellent";
						}
						elem.push(`
				<div class="user__courses--course {this.role.toLowerCase()}">
					<p>Title: <b>${item.title}</b></p>
					<p>${rol_1}'s score: <span class="${status}">${upString(status)}</span></p>
					<p>Lector: <b>${item.lector}</b></p>
				</div>
			`)
					})
			}
		} else if (this.role === "lector") {
			if (this.courses) {
				this.courses
					.forEach(function (item) {
						let status;
						let statusStud;
						if (item.score <= 20) {
							status = "satisfactory";
						} else if (item.score > 20 && item.score <= 55) {
							status = "good";
						} else if (item.score > 55 && item.score <= 85) {
							status = "very-good";
						} else if (item.score > 85 && item.score <= 100) {
							status = "excellent";
						}

						if (item.studentsScore <= 20) {
							statusStud = "satisfactory";
						} else if (item.studentsScore > 20 && item.studentsScore <= 55) {
							statusStud = "good";
						} else if (item.studentsScore > 55 && item.studentsScore <= 85) {
							statusStud = "very-good";
						} else if (item.studentsScore > 85 && item.studentsScore <= 100) {
							statusStud = "excellent";
						}

						elem.push(`
				<div class="user__courses--course {this.role.toLowerCase()}">
					<p>Title: <b>${item.title}</b></p>
					<p>${rol_1}'s score: <span class="${status}">${upString(status)}</span></p>
					<p>Average student's score: <span class="${statusStud}">${upString(statusStud)}</span></p>
				</div>
			`)
					})
			}
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
	            <div class="user__info--role ${this.role.toLowerCase()}">
	                <img src="image/${this.role.toLowerCase()}.svg" alt="${this.role.toLowerCase()}" height="25">
	                <p>${this.role}</p>
	            </div>
	        </div>

			<div class="user__courses admin--info">
			${elem.join("")}
			</div>
	    </div>`)
	};
	test() {
		console.log("test");
	}
}

class Student extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	}
}

class Lector extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
		// super.renderCourses(roles, gradation);
	}
}

class Admin extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
		// super.renderCourses(roles, gradation);
	}
}

users
	.map(function (item) {
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
	.forEach(function (item) {
		if (item.role === 'student') {
			return item.render(roles, gradation);
		} else {
			return item.renderCourses(roles, gradation);
		}
	})

document.write(`<div class="users">${list.join("")}</div>`)

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


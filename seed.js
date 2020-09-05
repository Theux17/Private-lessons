const faker = require('faker')
const { date, grade } = require('./src/lib/utils')

const Student = require('./src/app/models/Student')
const Teacher = require('./src/app/models/Teacher')

const studentEducationalLevel = ["5EF", "6EF", "7EF", "8EF", "9EF", "1EM", "2EM", "3EF"]
const teacherEducationalLevel = ["medio", "superior", "doutorado", "mestrado"]
const classLocation = ["Presencial", "À distância"]
const occupationArea = ["Português", "Matemática", "História", "Geografia", "Biologia", "Física", "Química", "Inglês"]

function dynamicArrayValues(array) {
    return array[Math.floor(Math.random() * array.length)]
}

    let totalTeachers = 10,
    totalStudents = 5

    
    async function createTeachers() {
        let teachers = []
        
    while (teachers.length < totalTeachers) {
        teachers.push({
            avatar_url: faker.image.image(),
            name: faker.name.firstName(),
            birth: date(faker.date.past(10, new Date(2010, 0, 1))).iso,
            educational_level: dynamicArrayValues(teacherEducationalLevel),
            class_location: dynamicArrayValues(classLocation),
            occupation_area: dynamicArrayValues(occupationArea),
            created_at: date(Date.now()).iso
        })
    }

    const teachersPromise = teachers.map(teacher => Teacher.create(teacher))
    teachersIds = await Promise.all(teachersPromise)
    console.log(teachers.length)
}

async function createStudent() {
    const students = []

    while (students.length < totalStudents) {
        students.push({
            avatar_url: faker.image.image(),
            name: faker.name.firstName(),
            birth: date(faker.date.past(10, new Date(2010, 0, 1))).iso,
            email: faker.internet.email(),
            educational_level: grade(dynamicArrayValues(studentEducationalLevel)),
            workload: Math.floor(Math.random() * 45),
            teacher_id: Math.floor(Math.random() * 10)
        })

    }
    const studentsPromise = students.map(student => Student.create(student))
    studentsIds = await Promise.all(studentsPromise)
    console.log(students.length)

}

async function init(){
    await createTeachers()
    await createStudent()
}

init()
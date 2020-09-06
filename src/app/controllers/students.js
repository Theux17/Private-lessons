const Student = require('../models/Student')
const Teacher = require('../models/Teacher')

const { date, age, grade } = require('../../lib/utils')

module.exports = {
    async index(req, res) {

        try {

            let { filter, limit, page, } = req.query

            page = page || 1
            limit = limit || 2
            let offset = limit * (page - 1)


            const params = {
                page,
                filter,
                limit,
                offset,
            }
    
            const students = await Student.paginate(params)
            
            students.length == 0 ? res.send("Nenhum resultado encontrado!") : true
            
            if(students.length){

                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                
                return res.render("students/index", { students, pagination, filter })
            }

        } catch (error) {
            console.error(error)
        }
    },

    async create(req, res) {

        const teacherOptions = await Student.teachersSelectedOptions()

        return res.render("students/create", { teacherOptions: teacherOptions.rows })
    },

    async post(req, res) {
        try {
            const keys = Object.keys(req.body)

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.send("Please, fill in all fields!")
                }
            }

            let { avatar_url, name, birth, email,
                educational_level, workload, teacher_id } = req.body

            educational_level = grade(educational_level)

            const student_id = await Student.create({
                avatar_url,
                name,
                birth,
                email,
                educational_level,
                workload,
                teacher_id
            })

            return res.render('messages/success', { student_id })

        } catch (error) {
            console.error(error)
        }
    },

    async show(req, res) {
        try {

            const student = await Student.findOne({ where: { id: req.params.id } })

            const teacher = await Teacher.findOne({ where: { id: student.teacher_id } })

            if (!student) return res.send("Student is not defined!")

            student.age = age(student.birth)
            student.birthDay = date(student.birth).birthDay

            return res.render("students/show", { student, teacher })

        } catch (error) {
            console.error(error)
        }
    },

    async edit(req, res) {
        const student = await Student.findOne({ where: { id: req.params.id } })
        if (!student) return res.send("Student isnot defined!")

        student.age = date(student.birth).iso

        const teachersOptions = await Student.teachersSelectedOptions()

        return res.render("students/edit", { student, teacherOptions: teachersOptions.rows })
    },

    async put(req, res) {
        try {

            let { avatar_url, name, birth, email, educational_level,
                workload, teacher_id } = req.body

            educational_level = grade(educational_level)

            await Student.update(req.body.id, {
                avatar_url,
                name,
                birth,
                email,
                educational_level,
                workload,
                teacher_id
            })

            return res.render('messages/success', { student_id: req.body.id })
        } catch (error) {
            console.error(error)
        }
    },

    async delete(req, res) {
        try {

            await Student.delete(req.body.id)

            return res.render("messages/delete")

        } catch (error) {
            console.error(error)
        }
    }

}

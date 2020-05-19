const { date, age } = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {
    index(req, res) {

        let { filter, limit, page, } = req.query
        
        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)


            const params = {
                page,
                filter,
                limit,
                offset,
                callback(students){
                    const pagination = {
                        total: Math.ceil(students[0].total / limit),
                        page         
                    }

                    return res.render("students/index", {students, pagination, filter})
                }    
            }        
            
        Student.paginate(params)     
    },

    create(req, res) {

        Student.teachersSelectedOptions(function(option){
            return res.render("students/create", {teacherOptions: option})
        })

    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill in all fields!")
            }
        }

        Student.create(req.body, function (student) {

            return res.redirect(`/students/show/${student.id}`)

        })

    },

    show(req, res) {
        Student.find(req.params.id, function (student) {
            if (!student) return res.send("Student isnot defined!")

            student.age = age(student.birth)
            student.birthDay = date(student.birth).birthDay

            console.log(student)
            return res.render("students/show", { student })
        })
    },

    edit(req, res) {
        Student.find(req.params.id, function (student) {
            if (!student) return res.send("Student isnot defined!")

            student.age = date(student.birth).iso

            Student.teachersSelectedOptions(function(option){
                return res.render("students/edit", { student, teacherOptions: option})
            })
    
        })
    },

    put(req, res) {
        Student.update(req.body, function () {
            return res.redirect(`/students/show/${req.body.id}`)
        })

    },

    delete(req, res) {
        Student.delete(req.body.id, function () {
            return res.redirect("/students")
        })
    }

}

const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')

routes.get("/", function(req, res){
    return res.redirect("/teachers")
})
routes.get("/teachers", teachers.index)
routes.get("/teachers/create", teachers.create)
routes.get("/teachers/show/:id", teachers.show)
routes.get("/teachers/edit/:id", teachers.edit)
routes.post("/teachers", teachers.post)
routes.put("/teachers", teachers.put)
routes.delete("/teachers", teachers.delete)


routes.get("/students", students.index)
routes.get("/students/create", students.create)
routes.get("/students/show/:id", students.show)
routes.get("/students/edit/:id", students.edit)
routes.post("/students", students.post)
routes.put("/students", students.put)
routes.delete("/students", students.delete)

module.exports = routes
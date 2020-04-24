const fs = require('fs')
const data = require('../data.json')
const { date, age, grade } = require('../utils')


exports.index = function(req, res){
    let students = []

    data.students.forEach(function(student, index){
        students.push({
            ...student,
            grade: grade(data.students[index].educational_level)
        })
    })
    
    console.log(students)


    return res.render("students/index", {  students }  )
}

exports.create = function(req, res){
    return res.render("students/create")
} 

exports.post = function (req, res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill in all fields!")
        }  
    }

    birth = Date.parse(req.body.birth)

    let id = 1
    const lastStudent = data.students[data.students.length - 1]
     
    if(lastStudent){
       id = lastStudent.id + 1
    }
    
    data.students.push({
        id, 
        ...req.body,
        birth,
    })
    
    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error!")
        
        return res.redirect("/students")    
    })
}

exports.show = function (req, res) {
    const { id } = req.params

    const studentFound = data.students.find(function (student){
       return student.id == id
    })

    if (!studentFound) return res.send("student is not found!")

    const student = {
        ...studentFound,
        age:age(studentFound.birth),
        grade: grade(studentFound.educational_level),
        birthDay: date(studentFound.birth).birthDay
    }

    console.log(student);
    return res.render("students/show", { student })
}

exports.edit = function (req, res) {
    const { id } = req.params

    const studentFound = data.students.find(function (student){
       return student.id == id
    })

    if (!studentFound) return res.send("student is not found!")

    const student = {
        ...studentFound,
        birth: date(studentFound.birth).iso,
        grade: grade(studentFound.educational_level)

    }

    return res.render("students/edit", { student })
}

exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const uptadatestudent = data.students.find(function (student, foundIndex){
        
        if( id == student.id ){
            index = foundIndex 
            return true
        }
        
    })
    
    if (!uptadatestudent) return res.send("student is not found!")
    
    const student = {
        ...uptadatestudent,
        ...req.body,
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error!")
        
        return res.redirect(`/students/show/${id}`)    
    })

}

exports.delete = function (req, res) {
    const { id } = req.body

    const filteredstudent = data.students.filter(function(student){
        return student.id != id
    })    

    data.students = filteredstudent

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error!")
        
        return res.redirect(`/students`)    
    })
}
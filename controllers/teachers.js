const fs = require('fs')
const data = require('../data.json')
const Intl = require('intl')
const { age, educationalLevel, date } = require('../utils')


exports.create = function(req, res){
    return res.render("teachers/create")
}

exports.index = function(req, res){
    return res.render("teachers/index", { teachers: data.teachers })
}

exports.post = function (req, res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill in all fields!")
        }  
    }

    

    const creat_at = Date.now()
    birth = Date.parse(req.body.birth)
     
    let id = 1
    const lastStudent = data.teachers[data.teachers.length - 1]
     
    if(lastStudent){
       id = lastStudent.id + 1
    }
    

    data.teachers.push({
        id,
        ...req.body,
        birth,
        creat_at
    })
    
    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error!")
        
        return res.redirect("/teachers")    
    })
}

exports.show = function (req, res) {
    const { id } = req.params

    const teacherFound = data.teachers.find(function (teacher){
       return teacher.id == id
    })

    if (!teacherFound) return res.send("Teacher is not found!")

    const teacher = {
        ...teacherFound,
        age: age(teacherFound.birth),
        educationalLevel: educationalLevel(teacherFound.educational_level),
        sideDish: teacherFound.occupation_area.split(','),
        creat_at: new Intl.DateTimeFormat("pt-BR").format(teacherFound.creat_at)

    }

    return res.render("teachers/show", { teacher })
}

exports.edit = function (req, res) {
    const { id } = req.params

    const teacherFound = data.teachers.find(function (teacher){
       return teacher.id == id
    })

    if (!teacherFound) return res.send("Teacher is not found!")

    const teacher = {
        ...teacherFound,
        date: date(teacherFound.birth),
        educationalLevel: educationalLevel(teacherFound.educational_level),
        sideDish: teacherFound.occupation_area.split(','),
        creat_at: new Intl.DateTimeFormat("pt-BR").format(teacherFound.creat_at)

    }

    return res.render("teachers/edit", { teacher })
}

exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const uptadateTeacher = data.teachers.find(function (teacher, foundIndex){
        if( id == teacher.id ){
            index = foundIndex 
            return true
        }

        
    })
    
    if (!uptadateTeacher) return res.send("Teacher is not found!")
    
    const teacher = {
        ...uptadateTeacher,
        ...req.body,
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error!")
        
        return res.redirect(`/teachers/show/${id}`)    
    })

}
 
exports.delete = function (req, res) {
    const { id } = req.body

    const filteredTeacher = data.teachers.filter(function(teacher){
        return teacher.id != id
    })    

    data.teachers = filteredTeacher

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error!")
        
        return res.redirect(`/teachers`)    
    })
}
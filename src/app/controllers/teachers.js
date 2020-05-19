const {date, age } = require('../../lib/utils')
const Teacher = require('../models/Teacher')


module.exports = {

    index(req, res){
        let { filter, limit, page, } = req.query
        
        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)


            const params = {
                page,
                filter,
                limit,
                offset,
                callback(teachers){
                    const pagination = {
                        total: Math.ceil(teachers[0].total / limit),
                        page         
                    }

                    return res.render("teachers/index", {teachers, pagination, filter, params})
                }    
            }        
            
            Teacher.paginate(params)     
    },

    create(req, res){
        return res.render("teachers/create")
    },

    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill in all fields!")
            }  
        }
        
        Teacher.create(req.body, function(teacher){

            return res.redirect(`/teachers/show/${teacher.id}`)

        })
    
    },

    show(req, res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send("Teacher isnot defined!")
            
            teacher.age = age(teacher.birth)
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", {teacher})
        })
    },

    edit(req, res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send("Teacher isnot defined!")
            
            teacher.age = date(teacher.birth).iso
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/edit", {teacher})

        })
    },

    put(req, res){
        Teacher.update(req.body, function(){
            return res.redirect(`/teachers/show/${req.body.id}`)
        })

    },

    delete(req, res){
        Teacher.delete(req.body.id, function(){            
            return res.redirect("/teachers")
        })
    }

}

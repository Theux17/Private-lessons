const { date, age, grade } = require('../../lib/utils')


module.exports = {
    index(req, res){
        let students = []

        data.students.forEach(function(student, index){
            students.push({
                ...student,
                grade: grade(data.students[index].educational_level)
            })
        })

        return
    },

    create(req, res){
        return
    },

    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill in all fields!")
            }  
        }
    
        birth = Date.parse(req.body.birth)

        return
    
    },

    show(req, res){
        return 
    },

    edit(req, res){
        return
    },

    put(req, res){
        return
    },

    delete(req, res) {
        return
    }
    
}

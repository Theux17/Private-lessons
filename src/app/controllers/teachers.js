const { age, educationalLevel, date } = require('../../lib/utils')
const Intl = require('intl')



module.exports = {
    index(req, res){
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
    
        const creat_at = Date.now()
        birth = Date.parse(req.body.birth)
    
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

    delete(req, res){
        return
    }

}

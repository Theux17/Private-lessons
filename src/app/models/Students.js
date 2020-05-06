const {date, grade } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {

    all(callback){
        db.query(`SELECT * FROM students`, function(err, results){
            if (err) throw `Database Error! ${err}`
            
            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
        INSERT INTO students (
            name,
            avatar_url,
            birth,
            email,
            educational_level,
            workload
        ) VALUES($1, $2, $3, $4, $5, $6)
        RETURNING id `
        
        const values = [
            data.name,
            data.avatar_url,
            data.birth,
            data.email,
            grade(data.educational_level),
            data.workload
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    }, 

    find(id, callback){
        db.query(`SELECT * FROM  students WHERE id = $1 `, [id], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `
        UPDATE students SET
            name=($1),
            avatar_url=($2),
            birth=($3),
            email=($4),
            educational_level=($5),
            workload=($6)        
        WHERE id = ($7)
        ` 

        const values = [
            data.name,
            data.avatar_url,
            data.birth,
            data.email,
            grade(data.educational_level),
            data.workload,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error! ${err}`
            callback()
        })

    }, 
    
    delete(id, callback){
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database Error! ${err}`
 
            callback()
        })
    }

}
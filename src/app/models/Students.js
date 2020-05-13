const {date, grade } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {

    all(callback){
        db.query(` 
        SELECT students. *, teachers.name AS teacher_name 
        FROM  students
        LEFT JOIN teachers ON (students.teacher_id = teachers.id) 
        `, function(err, results){
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
            workload,
            teacher_id
        ) VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING id `
        
        const values = [
            data.name,
            data.avatar_url,
            data.birth,
            data.email,
            grade(data.educational_level),
            data.workload,
            data.teachers
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    
    teachersSelectedOptions(callback){
        db.query(`SELECT name, id FROM teachers`, function(err, results){
            if(err) throw `Database Error! ${err}`
        
            callback(results.rows)
        })
    },

    find(id, callback){
        db.query(` 
        SELECT students. *, teachers.name AS teacher_name 
        FROM  students
        LEFT JOIN teachers ON (students.teacher_id = teachers.id) 
        WHERE students.id = $1 `, [id], function(err, results){
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
            workload=($6),
            teacher_id=($7)        
        WHERE id = ($8)
        ` 

        const values = [
            data.name,
            data.avatar_url,
            data.birth,
            data.email,
            grade(data.educational_level),
            data.workload,
            data.teachers,
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
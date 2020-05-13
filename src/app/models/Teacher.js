const {educationalLevel, date, classLocation, age } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {

    all(callback){
        db.query(` 
        SELECT teachers. *, count(students) AS total_students 
        FROM  teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        GROUP BY teachers.id 
        `, function(err, results){
            if (err) throw `Database Error! ${err}`
            
            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
        INSERT INTO teachers (
            name,
            avatar_url,
            birth,
            educational_level,
            class_location,
            occupation_area,
            created_at
        ) VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING id `
        
        const values = [
            data.name,
            data.avatar_url,
            data.birth,
            data.educational_level,
            classLocation(data.class_location),
            data.occupation_area,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    }, 

    find(id, callback){
        db.query(`SELECT * FROM  teachers WHERE id = $1 `, [id], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        db.query(` 
        SELECT teachers. *, count(students) AS total_students 
        FROM  teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        WHERE teachers.name ILIKE '%${filter}%'
        OR teachers.occupation_area ILIKE '%${filter}%'
        GROUP BY teachers.id 
        `, function(err, results){
            if (err) throw `Database Error! ${err}`
            
            callback(results.rows)
        })
    },

    update(data, callback){
        const query = `
        UPDATE teachers SET
            name=($1),
            avatar_url=($2),
            birth=($3),
            educational_level=($4),
            class_location=($5),
            occupation_area=($6)
        WHERE id = ($7)
        ` 

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.educational_level,
            classLocation(data.class_location),
            data.occupation_area,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error! ${err}`
            callback()
        })

    }, 
    
    delete(id, callback){
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database Error! ${err}`
 
            callback()
        })
    }

}
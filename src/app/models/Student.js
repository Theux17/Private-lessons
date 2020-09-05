const db = require('../../config/db')

const Base = require('./Base')

Base.init({table: 'students'})

module.exports = {
    ...Base,

    teachersSelectedOptions(){
        return db.query(`SELECT name, id FROM teachers`)
    },

    async paginate(params){
        const {filter, limit, offset} = params

        let query = "",
        filterQuery = "",
        totalQuery = `(
            SELECT count(*) FROM students
        ) AS total`


        if( filter ){
            filterQuery = `
            WHERE students.name ILIKE '%${filter}%'
            OR students.email ILIKE '%${filter}%'                
            `
            totalQuery = `(
                SELECT count(*) FROM students 
                ${filterQuery}
            )  AS total`
        }

        query = `
            SELECT students.*, ${totalQuery}, teachers.name AS teacher_name
            FROM  students
            LEFT JOIN teachers ON (students.teacher_id = teachers.id)
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `
        
        const results = await db.query(query, [limit, offset])
        return results.rows
    }
}
const Teacher = require('../models/Teacher')

const { date, age, classLocation } = require('../../lib/utils')

module.exports = {

    async index(req, res) {
        try {
            let { filter, limit, page, } = req.query

            // if(!filter ) return res.send("Nenhum professor encontrado!")

            page = page || 1
            limit = limit || 2
            let offset = limit * (page - 1)


            const params = {
                page,
                filter,
                limit,
                offset,
            }

            let teachers = await Teacher.paginate(params)

            teachers.length == 0 ? res.send("Nenhum resultado encontrado!") : true

            if(teachers.length){
                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }
                return res.render("teachers/index", { teachers, pagination, filter, params })
            }

        } catch (error) {
            console.error(error)
        }
    },

    create(req, res) {
        return res.render("teachers/create")
    },

    async post(req, res) {
        try {
            const keys = Object.keys(req.body)

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.send("Please, fill in all fields!")
                }
            }

            let { name, avatar_url, birth, educational_level, class_location, occupation_area, created_at } = req.body

            class_location = classLocation(classLocation)
            created_at = date(Date.now()).iso

            const teacher_id = await Teacher.create({
                name,
                avatar_url,
                birth,
                educational_level,
                class_location,
                occupation_area,
                created_at
            })

            return res.redirect(`/teachers/show/${teacher_id}`)

        } catch (error) {
            console.error(error)
        }

    },

    async show(req, res) {
        try {
            const teacher = await Teacher.findOne({ where: { id: req.params.id } })
            if (!teacher) return res.send("Teacher isnot defined!")

            teacher.age = age(teacher.birth)
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", { teacher })

        } catch (error) {
            console.error(error)
        }
    },

    async edit(req, res) {
        try {
            const teacher = await Teacher.findOne({ where: { id: req.params.id } })

            if (!teacher) return res.send("Teacher isnot defined!")

            teacher.age = date(teacher.birth).iso
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/edit", { teacher })

        } catch (error) {
            console.error(error)
        }
    },

    async put(req, res) {
        try {
            const keys = Object.keys(req.body)

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.send("Please, fill in all fields!")
                }
            }

            let { name, avatar_url, birth, educational_level, class_location, occupation_area } = req.body

            birth = date(birth).iso
            class_location = classLocation(class_location)

            await Teacher.update(req.body.id, {
                name,
                avatar_url,
                birth,
                educational_level,
                class_location,
                occupation_area
            })

            return res.redirect(`/teachers/show/${req.body.id}`)

        } catch (error) {
            console.error(error)
        }
    },

    async delete(req, res) {
        try {

            await Teacher.delete(req.body.id)
            return res.redirect("/teachers")

        } catch (error) {
            console.error(error)
        }
    }

}

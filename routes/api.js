let express = require('express')
let db = require('../models')
let Student = db.Student
let Sequelize = require('sequelize')

let router = express.Router()
//fetched students already added to API, orders by statID
router.get('/students', function(req, res, next){
    Student.findAll( {order: ['starID']} ).then( students => {
        return res.json(students)
    }).catch( err => next(err))
})
//post adds a new student, makes sure the request is valid and throws catch errors
router.post('/students', function(req, res, next){
    Student.create(req.body).then( (data) => {
        return res.status(201).send('ok')
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        }
        return next(err)
    })
})
//patch modifies existing entries
router.patch('/students/:id', function(req, res, next){
    Student.update(
        req.body, {
            where: {
                id: req.params.id
            }
        }).then( rowModified => {
            if (!rowModified[0]) { //if there are no rows modified
                return res.status(404).send('Not Found')
            } else {
                return res.send('ok')
            }
        }).catch( err => {
            if (err instanceof Sequelize.ValidationError) {
                let messages = err.errors.map( (e) => e.message)
                return res.status(400).json(messages)
            }
            return next(err)
    })
})
//deletes entries, where starID is the same as the call's starID so we don't delete the wrong student with the same name
router.delete('/students/:id', function(req, res, next){
    Student.destroy({where: {id: req.params.id}}).then( rowsModified => {
        return res.send('ok')
    }).catch( err => next(err)) //general catch block for errors, in case student doesn't exist, etc
})
module.exports = router //everything after this line is ignored

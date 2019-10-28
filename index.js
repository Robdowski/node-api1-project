// implement your API here
const express = require('express')

const db = require('./data/db.js')

const server = express()

server.use(express.json())


// GET ALL USERS
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log('error', err)
        res.status(500).json({ error: "Failed to retrieve the user list."})
    })
})

// GET USER BY ID
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
    .then(user => {
        if(user){
        res.status(200).json(user)
        }else{
            res.status(404).json({"message": "The user by that ID does not exist"})
        }
    })
    .catch(err => {
        console.log('error finding user by id', error)
        res.status(500).json({error: "Failed to retrieve user by ID."})
    })
})

// POST ADD USER 
server.post('/api/users', (req, res) => {
    const newUser = req.body

    if (!newUser.name && !newUser.bio){
        res.status(400).send('Please include a name and a bio with your request')
    } else {

    

    db.insert(newUser)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        console.log('error', err)
        res.status(500).json({error: "Failed to add the user to the database."})
    })
}
})

//DELETE USER BY ID

server.delete('/api/users/:id', (req, res) =>{
    const id = req.params.id

    db.remove(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        console.log('error', err)
        res.status(500).json({error: "Failed to delete the user from the database"})
    })
})

// EDIT USER BY ID

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = req.body


    db.findById(id)
    .then(user => {
        if(user){
        res.status(200)
        } else {
            res.status(404).json({"message": "The user with that ID does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({error: "There was an error updating the user."})
    })

    if (!user.name || !user.bio){
        res.status(400).json({"message": "Please include a name and bio in your request."})
    } else {
    db.update(id, user)
    .then(userres => {
        res.status(200).json(req.body)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "Failed to update the user to the database."})
    })
}
})

const port = 5000
server.listen(port, () => console.log('\nServer listening on port 5000\n'))
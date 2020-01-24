const router = require('express').Router();
const Users = require('./users-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Token = require('../auth/token.js')
const verify = require('../auth/verify.js')

// Get a list of all users
router.get('/', verify, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'There was an error retrieving users'})
        })
})

// Get a single user by username
router.get('/user', verify, (req, res) => {
    console.log(req.body)
    const { username } = req.body;
    Users.findByUserName(username)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: `The user named ${username} does not exist`})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "There was an error retrieving that user"})
        })
})

// Register a new user
router.post('/register', (req, res) => {
    const { username, password, department } = req.body;
    if(!username || !password || !department){
        res.status(400).json({ message: `A username, password, and department are required to register`})
    } else{
        Users.insert({username, password: bcrypt.hashSync(password, 10), department})
        .then(id => {
            res.status(201).json({ message: `User ${username} registered`, id })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'There was an error registering the user'})
        })
    }
    
})

// Login existing user
router.post('/login', (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;
    Users.findByUserName(username)
        .then(user => {
            if(user && bcrypt.compare(password, user.password)){
                const token = Token.generate(user)
                res.status(200).json({ 
                    message: `Welcome, ${username}`,
                    token
                })
            } else {
                res.status(401).json({ message: 'Invalid credentials' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error logging in'})
        })

})


module.exports = router;
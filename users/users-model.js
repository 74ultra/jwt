const db = require('../data/db.js')

function insert(user) {
    return db('users').insert(user, 'id').then(([id]) => id)
}

function find() {
    return db('users').select('id', 'username', 'department', 'password').orderBy('department')
}

function findByUserName(username) {
    return db('users').where({ username });
}

module.exports = {
    insert,
    find,
    findByUserName
}
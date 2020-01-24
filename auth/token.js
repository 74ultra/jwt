const jwt = require('jsonwebtoken');


function generate(user){
    const payload ={
        username: user.username,
        id: user.id
    };
    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, 'this is my secret', options)
}


module.exports = {
    generate
}
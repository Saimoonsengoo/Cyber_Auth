const jwt = require ('jsonwebtoken')

const maxAge = 1 * 24 * 60 * 60; //1 day

module.exports = function createToken(_id){
    return jwt.sign({_id}, process.env.JWT_SECRET , {expiresIn: maxAge})
}
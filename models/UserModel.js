const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "provide name"]
    },
    email : {
        type : String,
        required : [true, "provide email"],
        index : true
    },
    password : {
        type : String,
        required : [true, "provide password"]
    },
},{
    timestamps : true
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel
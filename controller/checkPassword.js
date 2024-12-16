const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function checkPassword(request,response){
    try {
        const { password, userId } = request.body

        const user = await UserModel.findById(userId)

        const verifyPassword = await bcryptjs.compare(password,user.password)

        if(!verifyPassword){
            return response.status(400).json({
                message : "Please Recheck Your Password",
                error : true
            })
        }

        const tokendata = {
            id : user._id,
            email : user.email
        }
        const token = jwt.sign(tokendata,process.env.JWT_SECRET_KEY,{ expiresIn : '2000d'})

        const cookieOptions = {
            http : true,
            secure: true
        }

        return response.cookie('token',token,cookieOptions).status(200).json({
            message : "The Login is Succesful",
            success : true,
            token : token
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        }) 
    }
}

module.exports = checkPassword
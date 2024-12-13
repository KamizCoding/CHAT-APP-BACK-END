const UserModel = require("../models/UserModel")

async function checkEmail(request,response){
    try {
        const { email } = request.body

        const checkEmail = await UserModel.findOne({email}).select("-password")

        if(!checkEmail){
            return response.status(400).json({
                message : "The specified user does not exist",
                error : true
            })
        }

        return response.status(200).json({
            message : "The Email was verified",
            success : true,
            data : checkEmail
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = checkEmail
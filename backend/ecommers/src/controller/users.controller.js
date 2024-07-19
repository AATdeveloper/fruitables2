const bcrypt = require('bcrypt');
const Users = require('../models/users.model');



const register = async (req, res) => {
    try {

        const { email, password } = req.body

        const user =await Users.findOne({
            $or: [{ email }]
        })

        if (user) {
            res.status(409).json({
                success: false,
                message: "user alredy exist"
            })
        }
        const hashPassword =await bcrypt.hash(password,10)

        const userData =await Users.create({...req.body,password:hashPassword})

        if (!userData) {
            res.status(500).json({
                success: false,
                message: "create hash password error"
            })
        }

        const userDataF =await Users.findById({_id: userData._id}).select("-password")

        if (!userDataF) {
            res.status(500).json({
                success: false,
                message: "internal server error" +  error.message
            })
        }

        res.status(201).json({
            success: true,
            message: "ragister succesfully",
            data : userDataF
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" +  error.message
        })
    }
}




module.exports = {
    register,
}




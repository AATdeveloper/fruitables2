var jwt = require('jsonwebtoken');
const Users = require('../models/users.model');



const auth = (roles = []) => async (req, res, next) => {
    try {
        const token = req.cookies.accrestoken || req.header("Authorization")?.replace("Bearer", "");

        console.log(token);

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Please Proived Token"
            })
        }

        try {
            velidateToken = await jwt.verify(token, "abc123")
            console.log(velidateToken);

            const user = await Users.findById(velidateToken._id);

            console.log(user);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "user not found"
                })
            }

            if (!roles.some((v) => v == user.role)) {
                return res.status(400).json({
                    success: false,
                    message: "you are not accesable"
                })
            }

            console.log("okkkk");

            req.user = user

            next();

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal sever error" + error.message
        })
    }
}

module.exports = auth;

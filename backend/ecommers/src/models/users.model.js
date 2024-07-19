const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            trim : true,
            lowercase : true,
            required : true,
        },
        email : {
            type : String,
            trim : true,
            required : true,
            unique : true,
            required : true,
        },
        password : {
            type : String,
            required : true,
            },
       role : {
        type : String,
        trim : true,
        required : true,
      
        },
       
        isActive : {
            type :Boolean,
            default : true
        }
    },
    {
        timestamps : true,
        versionKey : false
    }
)

const Users = mongoose.model("Users", UsersSchema)
module.exports = Users
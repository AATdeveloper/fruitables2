const express = require("express");
const { usersController } = require("../../../controller");


const routes = express.Router();

routes.post(
    "/useradd",
    usersController.userpost

)

routes.post(
    "/login",
    usersController.login

)

routes.post(
    "/get-newtoken",
    usersController.getnewtoken

)


module.exports = routes;

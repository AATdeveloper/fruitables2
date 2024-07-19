const express = require("express");
const { usersController } = require("../../../controller");

const routes = express.Router();

routes.post('/register',
    usersController.register
)


module.exports = routes;
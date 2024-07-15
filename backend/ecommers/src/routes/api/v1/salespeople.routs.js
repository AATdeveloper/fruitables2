const express = require("express");
const { salespeopleController } = require("../../../controller");

const routes = express.Router();

routes.get('/getsalespeople',
    salespeopleController.listSalespeople

)

module.exports = routes;
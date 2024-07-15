const express = require("express");

const routes = express.Router();

const categoriesRoute = require("./categories.routs");
const subcategoriesRoute = require("./subcategories.routs");
const productsRoute = require("./products.routs");
const salespeopleRoute = require("./salespeople.routs");
// const variantsRoute =require("./variants.routs");

routes.use("/categories", categoriesRoute)
routes.use("/subcategories", subcategoriesRoute)
routes.use("/products",productsRoute)
routes.use("/salespeople",salespeopleRoute)

// routes.use("/variants",variantsRoute)


module.exports = routes;



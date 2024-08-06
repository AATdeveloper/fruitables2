const express = require("express");
const { categoriescontroller } = require("../../../controller");
const validation = require("../../../middelware/validation");
const { categoryvalidation } = require("../../../Validation");

// const auth = require("../../../middelware/auth");

const routes = express.Router();

routes.get(
    '/categories-list',
    // auth(["Admin"]),
    categoriescontroller.listcategories
)

routes.post('/categories-add',
    validation(categoryvalidation.categoryadd),
    categoriescontroller.addcategories
)


routes.put('/categories-update/:category_id',
    categoriescontroller.updatecategories
)

routes.delete('/categories-delete/:category_id',
    categoriescontroller.deletecategories
)

routes.get(
    '/countcategories',
    categoriescontroller.countcategories,

)


routes.get(
    '/mostprocat',
    categoriescontroller.mostprocat,

)

routes.get(
    '/totalproducts',
    categoriescontroller.totalproducts,

)

routes.get(
    '/inactivecategories',
    categoriescontroller.inactivecategories,

)

routes.get(
    '/countsubcategories',
    categoriescontroller.countsubcategories,

)





module.exports = routes;
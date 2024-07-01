const express = require("express");
const { subcategoriescontroller } = require("../../../controller");

const routes = express.Router();

routes.get('/subcategorieslist',
    subcategoriescontroller.subcategorieslist

)
routes.get('/getsubcategories/:subcategory_id',
    subcategoriescontroller.getsubcategory
)

routes.get('/getsubCategorybyCategory/:category_id',
    subcategoriescontroller.getsubCategorybyCategory
)

routes.post('/add-subcategories',
    subcategoriescontroller.addsubcategory

)
routes.put('/put-subcategories/:subcategory_id',
    subcategoriescontroller.putsubcategories
)

routes.delete('/delete-subcategories/:subcategorydelete_id',
    subcategoriescontroller.deletesubcategory

)

routes.get('/countactsubcategories',
    subcategoriescontroller.countactsubcategories

)

routes.get('/mostproducts',
    subcategoriescontroller.mostproducts

)



routes.get('/inactivesubcategory',
    subcategoriescontroller.inactivesubcategory

)

module.exports = routes;
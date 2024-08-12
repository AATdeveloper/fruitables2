const express = require("express");
const { categoriescontroller } = require("../../../controller");
const validation = require("../../../middelware/validation");
const { categoryvalidation } = require("../../../Validation");

const auth = require("../../../middelware/auth");

const routes = express.Router();

routes.get(
    '/categories-list',
    // auth(["Admin","user"]),
    categoriescontroller.listcategories
)

routes.get(
    '/categories-get',
    // auth(["Admin"]),
    validation(categoryvalidation.categoryget),
    categoriescontroller.getcategories
)

routes.post('/categories-add',
    validation(categoryvalidation.categoryadd),
    categoriescontroller.addcategories
)


routes.put('/categories-update/:category_id',
    validation(categoryvalidation.categoryupdate),
    categoriescontroller.updatecategories
)

routes.delete('/categories-delete/:category_id',
    validation(categoryvalidation.categorydelete),
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



// [
//     {
//       $lookup: {
//         from: 'variants',
//         localField: '_id',
//         foreignField: 'product_id',
//         as: 'variant'
//       }
//     },
//     {
//       $lookup: {
//         from: 'reviews',
//         localField: '_id',
//         foreignField: 'product_id',
//         as: 'review'
//       }
//     },
//     {
//       $addFields: {
//         avgrating:'$review.rating'
//       }
//     },
//     {
//       $unwind: {
//         path: '$variant',
        
//       }
//     },
//     {
//       $match: {
//            avgrating:{$gte:4},
//         category_id:1,
//         'variant.attributes.Price':{$gte:0 , $lte:10000}
//       }
//     },
//     {
//       $group: {
//         _id: '$_id',
//         name:{$first:'$name'},
//        variant:{$push:"$variant"},
//         review:{$push:"$review"}
//         }
//     },
//     {
//       $sort: {
//         name:1
//       }
//     },
//     {
//       $skip: 0
//     },
//     {
//       $limit: 10
//     }
//   ]

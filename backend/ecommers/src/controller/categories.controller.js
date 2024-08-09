const Categories = require("../models/categories.models")

const listcategories = async (req, res) => {
    
    // localhost:8000/api/v1/categories/categories-list?page=1&pageSize=3

    console.log("cateee", req.query.page, req.query.pageSize);

    try {
        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize);

        if (page <= 0 || pageSize <= 0) {
            res.status(400).json({
                success: false,
                message: "page or pageSize must be grater than zero"
            })
        }

        const categories = await Categories.find();

        console.log(categories);
        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: false,
                message: "categories not found"
            })
        }

        let startIndex = 0, endIndex = 0, pagination = 0;

        if (page > 0 || pageSize > 0) {
            startIndex = (page - 1) * pageSize;
            endIndex = startIndex + pageSize;
            pagination = categories.slice(startIndex,endIndex)
        }

        res.status(200).json({
            success: true,
            totalData:categories.length,
            message: "categories feched successfully",
            data: pagination
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error:" + error.message
        })
    }
}
const getcategories = async (req, res) => {
    try {

        console.log(req.params.category_id);

        const category = await Categories.findById(req.params.category_id);
        console.log(category);


        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category fetched sucessfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error:" + error.message
        })
    }
}
const addcategories = async (req, res) => {
    console.log("qdoisoidhoioid", req.body);
    
    // try {


    //     const category = await Categories.create(req.body)
    //     // console.log(category);

    //     if (!category) {
    //         res.status(400).json({
    //             success: false,
    //             message: "Category not Created"
    //         })
    //     }

    //     res.status(201).json({
    //         success: true,
    //         message: "Category Created succesfully",
    //         data: category
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "internal server error" + error.message
    //     })
    // }
}
const deletecategories = async (req, res) => {
    try {
        // console.log(req.params.category_id);

        const category = await Categories.findByIdAndDelete(req.params.category_id)

        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category Delete succesfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}
const updatecategories = async (req, res) => {
    //    console.log("dhuwhfhf",req.params.category_id,req.body);
    try {
        const category = await Categories.findByIdAndUpdate(req.params.category_id, req.body, { new: true, runValidators: true })

        if (!category) {
            res.status(400).json({
                success: false,
                message: "Category not update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category Updated  succesfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const countcategories = async (req, res) => {

    const activeCount = await Categories.aggregate([
        [
            {
                $match: {
                    isActive: true
                }
            },
            {
                $count: 'Noofcategories'
            }
        ]
    ])
    res.status(200).json({
        success: true,
        message: "Category count sucessfully",
        data: activeCount
    })
    console.log(activeCount);

}


const mostprocat = async (req, res) => {

    const activeCount = await Categories.aggregate([
        [
            {
                "$match": {
                    "isActive": true
                }
            },
            {
                "$lookup": {
                    "from": "products",
                    "localField": "_id",
                    "foreignField": "category_id",
                    "as": "products"
                }
            },
            {
                "$project": {
                    "categoryName": "$name",
                    "productCount": { "$size": "$products" }
                }
            },
            {
                "$sort": {
                    "productCount": -1
                }
            },
            {
                "$limit": 3
            }
        ]

    ])
    res.status(200).json({
        success: true,
        message: "Highest products get sucessfully",
        data: activeCount
    })
    console.log(activeCount);

}

const totalproducts = async (req, res) => {

    const activeCount = await Categories.aggregate([
        [
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category_id",
                as: "products"
              }
            },
            {
              $match: {
                products: {
                  $ne: []
                }
              }
            },
            {
              $group: {
                _id: "$_id",
               category_name: { $first:"$category_name"},
                
          "Total-Products":{
            $sum:1
          }
              }
            }
          ]
        
        
    ])
    res.status(200).json({
        success: true,
        message: "Total products get  sucessfully",
        data: activeCount
    })
    console.log(activeCount);

}


const inactivecategories = async (req, res) => {

    const activeCount = await Categories.aggregate([
        [
            {
              "$match": { "isActive": false }
            }
          ]
        
        
    ])
    res.status(200).json({
        success: true,
        message: "inactive categories sucessfully",
        data: activeCount
    })
    console.log(activeCount);

}

const countsubcategories = async (req, res) => {

    const activeCount = await Categories.aggregate([
        [
            {
              $lookup: {
                from: "subcategories",
                localField: "_id",
                foreignField: "category_id",
                as: "Subacategory"
              }
            },
            {
              $match: {
                Subacategory: { $ne: [] }
              }
            },
            {
              $unwind: "$Subacategory"
            },
          
            {
              $group: {
                _id: "$_id",
                category_name: { $first: "$name" },
                countsubcategories: {
                  $sum: 1
                },
          
                subcategories_name: {
                  $push: "$Subacategory"
                }
              }
            }
          ]
        
        
    ])
    res.status(200).json({
        success: true,
        message: "inactive categories sucessfully",
        data: activeCount
    })
    console.log(activeCount);

}




module.exports = {
    listcategories,
    getcategories,
    addcategories,
    deletecategories,
    updatecategories,
    countcategories,
    mostprocat,
    totalproducts,
    inactivecategories,
    countsubcategories


}



// /category/count-category
// [
//     {
//       $match: {
//         isActive:true
//       }
//     },
//     {
//       $count: 'Noofcategories'
//     }
//   ]




///category/most-products         //Retrieve categories with the highest number of products.
// [
//     {
//       "$match": {
//         "isActive": true
//       }
//     },
//     {
//       "$lookup": {
//         "from": "products",
//         "localField": "_id",
//         "foreignField": "category_id",
//         "as": "products"
//       }
//     },
//     {
//       "$project": {
//         "categoryName": "$name",
//         "productCount": { "$size": "$products" }
//       }
//     },
//     {
//       "$sort": {
//         "productCount": -1
//       }
//     },
//     {
//       "$limit": 3
//     }
//   ]


// /category/total-products      //Retrieve the total number of products per category with products?
// [
    
// {
//     "$lookup": {
//       "from": "products",
//       "localField": "_id",
//       "foreignField": "category_id",
//       "as": "products"
//     }
//   },
//   {
//     "$project": {
//       "categoryName": "$name",
//       "productCount": { "$size": "$products" },
//       "productName": "$products"
//     }
//   }
// ]


// /category/inactive              //Retrieve a list of inactive categories.
// [
//   {
//     "$match": { "active": false }
//   }
// ]



// /category/count-subcategories   //Retrieve the count of subcategories for each category.

// [
//     {
//       $lookup: {
//         from: "subcategories",
//         localField: "_id",
//         foreignField: "category_id",
//         as: "Subacategory"
//       }
//     },
//     {
//       $match: {
//         Subacategory: { $ne: [] }
//       }
//     },
//     {
//       $unwind: "$Subacategory"
//     },
  
//     {
//       $group: {
//         _id: "$_id",
//         category_name: { $first: "$category_name" },
//         countsubcategories: {
//           $sum: 1
//         },
  
//         subcategories_name: {
//           $push: "$Subacategory.subcategory_name"
//         }
//       }
//     }
//   ]


// category/category-subcategory/{category_id}/        //Retrieve of subcategory in a specific category




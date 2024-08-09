// const { pipeline } = require("nodemailer/lib/xoauth2");
const Products = require("../models/products.models");
const uploadFiles = require("../utils/cloudinary");

const listproducts = async (req, res) => {
    try {
        const products = await Products.find();

        if (!products || products.length === 0) {
            res.status(404).json({
                success: false,
                message: "Products not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Products fetched sucessfully",
            data: products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const getproducts = async (req, res) => {
    try {
        // console.log(req.params.product_id);

        const product = await Products.findById(req.params.product_id);
        // console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product fetched sucessfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const addproducts = async (req, res) => {
    try {
        console.log(req.body);
        // console.log(req.file);

        const fileRes = await uploadFiles(req.file.path, "Product")
        //    console.log(fileRes);
        const product = await Products.create({
            ...req.body,
            product_img: {
                public_id: fileRes.public_id,
                url: fileRes.url
            }
        });
        // console.log(product);

        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not creted"
            })
        }

        res.status(201).json({
            success: true,
            message: "Product Crated sucessfully",
            data: product
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const deleteproducts = async (req, res) => {
    try {
        console.log(req.params.product_id);

        const product = await Products.findByIdAndDelete(req.params.product_id);
        // console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted sucessfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const updateproducts = async (req, res) => {

    if (req.file) {
        console.log("New Image");

        const fileRes = await uploadFiles(req.file.path, "Product")
        //    console.log(fileRes);

        const product = await Products.findByIdAndUpdate(req.params.product_id,
            {
                ...req.body,
                product_img: {
                    public_id: fileRes.public_id,
                    url: fileRes.url
                }
            },
            { new: true, runValidators: true }
        );

        // console.log(product);

        console.log(req.params);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Update sucessfully",
            data: product
        })

    } else {
        console.log("Old Image");

        const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true });

        // console.log(product);

        console.log(req.params);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Update sucessfully",
            data: product
        })
    }
    // try {
    //     console.log("acbd", req.params.product_id, req.body);

    //     const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators:true});
    //     // console.log(product);
    //     console.log(req.params);
    //     if (!product) {
    //         res.status(400).json({
    //             success: false,
    //             message: "Product not Update"
    //         })
    //     }

    //     res.status(200).json({
    //         success: true,
    //         message: "Products Update sucessfully",
    //         data: product
    //     })

    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "Intenal server error." + error.message
    //     })
    // }
}

const Topratedpro = async (req, res) => {

    const activeCount = await Products.aggregate([
        [
            {
              $group: {
                _id: "$product_id",
                averageRating: {
                  $avg: "$rating"
                    }
                }
            },
            {
              $sort: {
                averageRating: -1
                }
            },
            {
              $limit: 5
            },
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
                }
            },
            {
              $unwind: "$productDetails"
            },
            {
              $project: {
                _id: 0,
                productId: "$_id",
                productName: "$productDetails.name",
                averageRating: 1
                }
            }
        ]
        
          
          
    ])
    res.status(200).json({
        success: true,
        message: "Products get sucessfully",
        data: activeCount
    })
    console.log(activeCount);

}


const Search = async (req, res) => {
    // localhost:8000/api/v1/products/Search?sortOrder=asc&rating=4&max=10000&min=0&category=1&page=2&limit=1
    try {
        const { sortOrder, rating, max, min, category, page, limit } = req.query

        let p = parseInt(page);
        let l = parseInt(limit);

        const matchPip = {}

        if (rating) {
            matchPip['avgRating'] = { "$gte": rating }
        }
        if (category) {
            matchPip['category_id'] = category
        }

        matchPip['variant.attributes.Price'] = {}

        if (min != undefined) {
            matchPip['variant.attributes.Price'].$gt = min
        }

        if (max != undefined) {
            matchPip['variant.attributes.Price'].$lte = max
        }

        // console.log(matchPip);

        const pipline = [
            {
              $lookup: {
                from: 'variants',
                localField: '_id',
                foreignField: 'product_id',
                as: 'variant'
              }
            },
            {
              $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'product_id',
                as: 'review'
              }
            },
            {
              $addFields: {
                avgrating:'$review.rating'
              }
            },
            {
              $unwind: {
                path: '$variant',
                
              }
            },
            {
              $match: {
                   avgrating:{$gte:4},
                category_id:1,
                'variant.attributes.Price':{$gte:0 , $lte:2000}
              }
            },
            {
              $group: {
                _id: '$_id',
                name:{$first:'$name'},
               variant:{$push:"$variant"},
                review:{$push:"$review"}
                }
            },
            {
              $sort: {
                name: sortOrder === 'asc' ?1 : -1
              }
            }
          ]

        //   console.log(p,l);
          
        if (p > 0 && l > 0) {
            pipline.push({ $skip: (p - 1) * l })
            pipline.push({ $limit:  l })
        }

        // console.log(JSON.stringify(pipline));
        

        const data = await Products.aggregate(pipline)
        // console.log(req.query)
        // console.log(data);


        res.status(400).json({
            success : true,
            message : "Product data fected",
            data : data
        })

    } catch (error) {
        console.log(error.message);

    }
}
// const mostproducts = async (req, res) => {

//     const activeCount = await Subcategories.aggregate([
//         [
//     {
//       $match: {
//         discount: { $gt: 0 }
//       }
//     },
//     {
//       $project: {
//         _id: 1,
//         name: 1,
//         description: 1,
//         price: 1,
//         discount: 1
//       }
//     },
//     {
//       $sort: {
//         discount: -1
//       }
//     }
    
//   ]
//     ])
//     res.status(200).json({
//         success: true,
//         message: "Products get sucessfully",
//         data: activeCount
//     })
//     console.log(activeCount);

// }

module.exports = {
    listproducts,
    getproducts,
    addproducts,
    deleteproducts,
    updateproducts,
    Topratedpro,
    Search
}




//   /products/top-rated                                     //Retrieve products with the highest ratings.
// [
//     {
//       $group: {
//         _id: "$product_id",
//         averageRating: {
//           $avg: "$rating"
//             }
//         }
//     },
//     {
//       $sort: {
//         averageRating: -1
//         }
//     },
//     {
//       $limit: 5
//     },
//     {
//       $lookup: {
//         from: "products",
//         localField: "_id",
//         foreignField: "_id",
//         as: "productDetails"
//         }
//     },
//     {
//       $unwind: "$productDetails"
//     },
//     {
//       $project: {
//         _id: 0,
//         productId: "$_id",
//         productName: "$productDetails.name",
//         averageRating: 1
//         }
//     }
// ]




//   /products/discounts                                     //Retrieve products currently on sale.
// [
//     {
//       $match: {
//         discount: { $gt: 0 }
//       }
//     },
//     {
//       $project: {
//         _id: 1,
//         name: 1,
//         description: 1,
//         price: 1,
//         discount: 1
//       }
//     },
//     {
//       $sort: {
//         discount: -1
//       }
//     }
    
//   ]
  

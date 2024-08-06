const { pick } = require("../helper/pick");


const validation = (schema) => (req,res,next) => {
    // console.log(Object.keys(schema));

   

    try {
        const objs = pick(req,Object.keys(schema))

        console.log(objs);
     const { error,value } = joi.compile.validate(schema);
    


    } catch (error) {
        console.log(error);
        
        
    }










    
    


} 

module.exports = validation
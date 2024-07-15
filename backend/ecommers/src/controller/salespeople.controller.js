const { getsalespeople } = require("../models/salespeople.models");

const listSalespeople = () => {
    try {
        const salespeople = getsalespeople();
        console.log(salespeople);
        
    } catch (error) {
        console.log(error);
    }
}


module.exports ={
    listSalespeople
}

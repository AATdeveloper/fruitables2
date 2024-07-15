const  pool  = require("../db/mysql");


const getsalespeople = async () => {
    try {
        const data = await pool.execute('SELECT * FROM salespeople');
        console.log(data);
    } catch (error) {
        console.log(error);
        
    }
}

module.exports={
    getsalespeople
}
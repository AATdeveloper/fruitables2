const pool = require("../db/mysql");


const getsalespeople = async () => {
    try {
        const [data, field] = await pool.execute('SELECT * FROM salespeople');
        console.log(data);

        return data;
    } catch (error) {
        throw new Error("Error Fetch Salespeople")





    }
}

const postsalespeople = async (city, sname, comm) => {
    try {

        const [result] = await pool.execute("INSERT INTO salespeople (city, sname,comm) VALUES (?,?,?)",
            [city, sname, comm]);


        // console.log(result);
        return { city, sname, comm, snum: result.insertId }



    } catch (error) {
        console.log(error);
    }
}


const deletesalespeople = async (snum) => {
    try {
        const [result] = await pool.execute("DELETE FROM salespeople WHERE SNUM=?", [snum]);
        console.log(result);
        return result;
    } catch (error) {
        throw new Error("Error deleting salespeople:" + error.message);
    }
}


const updatesalespeople = async (snum, city, sname, comm) => {
    try {
        const [result] = await pool.execute("UPDATE salespeople SET city=?, sname=?, comm  =? WHERE SNUM=?", [city, sname, comm, snum]);
        console.log(result);
        return result;
    } catch (error) {
        throw new Error("Error updating salespeople:" + error.message);
    }                       
}





module.exports = {
    getsalespeople,
    postsalespeople,
    deletesalespeople,
    updatesalespeople
}
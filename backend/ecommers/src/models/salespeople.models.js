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

const postsalespeople = async (city, sname, comm,IsActive) => {
    try {

        const [result] = await pool.execute("INSERT INTO salespeople (city, sname,comm,IsActive) VALUES (?,?,?,?)",
            [city, sname, comm,IsActive]);


        // console.log(result);
        return { city, sname, comm,IsActive, snum: result.insertId }



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


const updatesalespeople = async (snum, city, sname, comm,IsActive) => {
    try {
        const [result] = await pool.execute("UPDATE salespeople SET city=?, sname=?, comm  =? ,IsActive =? , WHERE SNUM=?", [city, sname, comm, snum,IsActive]);
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
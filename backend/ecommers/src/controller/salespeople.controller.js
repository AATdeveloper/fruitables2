const { Salespeople } = require("../models");


const listSalespeople = async (req, res) => {
    try {
        const salespeople = await Salespeople.getsalespeople();

        res.status(200).json({
            success: true,
            data: salespeople,
            message: "Salespeople listed successfully"


        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []

        })
    }
}

const addsalespeople = async (req, res) => {
    try {
        const { city, sname, comm } = req.body

        const salespeople = await Salespeople.postsalespeople(city, sname, comm);
        // console.log(salespeople);

        res.status(201).json({
            success: true,
            data: salespeople,
            message: "Salespeople Added successfully"


        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []

        })
    }

}

const deletesalespeople = async (req, res) => {

    try {
        const { snum } = req.params;
        const salespeople = await Salespeople.deletesalespeople(snum);
        res.status(200).json({
            success: true,
            data: salespeople,
            message: "salespeople data is deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting salesperson:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        })
    }
}


const updatesalespeople = async (req, res) => {
    try {
        const { snum } = req.params;
        const { city, sname, comm } = req.body
        const salespeople = await Salespeople.updatesalespeople(snum, city, sname, comm);
        res.status(200).json({
            success: true,
            data: salespeople,
            message: "salespeople data is updated successfully."
        });
    } catch (error) {
        console.error("Error updating salesperson:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        })
    }
}








module.exports = {
    listSalespeople,
    addsalespeople,
    deletesalespeople,
    updatesalespeople
}

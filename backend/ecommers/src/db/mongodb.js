const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://taiamin465:abcd123@cluster0.42dvy5f.mongodb.net/ecommerce")
            .then(() => console.log("mongodb connected succefully"))
            .catch((error) => console.log("mongodb deta not coonect :" + error))
    } catch (error) {
        console.log("mongodb deta not coonect :" + error)
    }
}

module.exports = connectDB
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://vrajd2602:JkgcsdCXkq93MnU2@cluster0.majhxiq.mongodb.net/ecom")
            .then(() => console.log("mongodb connected succefully"))
            .catch((error) => console.log("mongodb deta not coonect :" + error))
    } catch (error) {
        console.log("mongodb deta not coonect :" + error)
    }
}

module.exports = connectDB



// mongodb+srv://taiamin465:abcd123@cluster0.42dvy5f.mongodb.net/ecommerce

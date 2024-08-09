require('dotenv').config()

const express = require("express")
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongoDb");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const passport = require("passport");
const {Googleprovider, facebookProvider} = require("./utils/Provider");
const connectchat = require("./utils/socketIO");


const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(require('express-session')({ secret: process.env.EXPRESS_SESION_SECRET_KEY_URL, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

connectDB()
Googleprovider()
facebookProvider()
connectchat()

app.use("/api/v1", routes)

app.listen(8000, () => {
    console.log("server started at port 8000");
})





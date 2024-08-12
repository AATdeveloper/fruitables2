const express = require("express");
const { usersController } = require("../../../controller");
const passport = require("passport");
const sendMail = require("../../../utils/nodemailer");
const pdfmake = require("../../../utils/pdfmake");
// const upload = require("../../../middelware/upload");


const routes = express.Router();

routes.post(
    "/useradd",
    // upload.single("avtar"),
    usersController.userpost

)

routes.post(
    "/login",
    usersController.login

)

routes.post(
    "/get-newtoken",
    usersController.getnewtoken

)


routes.post(
    "/logout",
    usersController.logout

)

routes.get('/googlelogin',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

routes.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("google login successfull");
        // Successful authentication, redirect home.
        res.send('<h1>okkk</h1>');
    });



routes.get('/facebookLogin',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

routes.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        console.log("Facebook login successful");
        res.send("<h1>Facebook login successful</h1>");
    });


    routes.get('/sendMail',
        sendMail
    )

    routes.get('/pdfmake',
        pdfmake
    )
module.exports = routes;

const express = require("express");
const { usersController } = require("../../../controller");
const passport = require("passport");


const routes = express.Router();

routes.post(
    "/useradd",
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
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

module.exports = routes;

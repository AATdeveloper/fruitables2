const passport = require('passport');
const Users = require('../models/users.model');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Googleprovider = async () => {
    console.log("Googleprovider");
    try {

        await passport.use(new GoogleStrategy({
             
        },
            async function (accessToken, refreshToken, profile, cb) {


                try {
                    console.log(profile);
                    let user = await Users.findOne({ googleId: profile.id })

                    console.log(user);
                    if (!user) {
                        user = await Users.create({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            role: "user"
                        })

                        console.log(user, {
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            role: "user"
                        });
                    }
                    return cb(null, user);

                } catch (error) {
                    console.log(error);
                    return cb(error, null);
                }

            },



        ));
    } catch (error) {
console.log("kkkkkk",error);
    }

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            let user = await Users.findOne({ _id: id })
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    });

}

module.exports = Googleprovider;
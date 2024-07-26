const passport = require('passport');
const Users = require('../models/users.model');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Googleprovider = async () => {

    try {

        await passport.use(new GoogleStrategy({
            clientID: "281020566988-6piiobo4fvui6pts6qq24spquhqngk3i.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:8000/api/v1//users/auth/google/callback"
        },
            async function (accessToken, refreshToken, profile, cb) {


                try {
                    console.log(profile);
                    let user = await Users.find({ googleId: profile.id })

                    if (!user) {
                        user = await Users.create({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            role: "user"
                        })
                    }
                    return cb(null, user);

                } catch (error) {
                    return cb(error, null);
                }

            },



        ));
    } catch (error) {

    }

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        await Users.findById(id, function (err, user) {
            done(err, user);
        });
    });

}

module.exports = Googleprovider;
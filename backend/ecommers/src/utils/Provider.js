const passport = require('passport');
const Users = require('../models/users.model');
// require('botenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const Googleprovider = async () => {
    console.log("Googleprovider");
    try {

        await passport.use(new GoogleStrategy({
            clientID: "281020566988-6piiobo4fvui6pts6qq24spquhqngk3i.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:8000/api/v1/users/google/callback"
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

const facebookProvider = () => {
    passport.use(new FacebookStrategy({
        clientID: "3744927445772566",
        clientSecret: "86a431b73f57e9ec0ff2b35b64b782ff",
        callbackURL: "http://localhost:8000/api/v1/users/facebook/callback",
        profileFields: ['id', 'displayName', 'emails']
    },
    async (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        try {
            const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

            let user = await Users.findOne({ facebookId: profile.id });
            if (!user) {
                user = await Users.create({
                    name: profile.displayName,
                    email: email,
                    facebookId: profile.id,
                    role: "user"
                });
            }
            return cb(null, user);
        } catch (error) {
            console.error('Error in Facebook strategy', error);
            return cb(error, null);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Users.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};




module.exports = Googleprovider;
module.exports = facebookProvider;
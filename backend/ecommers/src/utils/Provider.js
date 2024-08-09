const passport = require('passport');
const Users = require('../models/users.model');
// require('botenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const Googleprovider = async () => {
    console.log("Googleprovider");
    try {

        await passport.use(new GoogleStrategy({
            clientID: process.env.PROVIDER_GOOGLE_CLINT_ID_URL,
            clientSecret: process.env.PROVIDER_GOOGLE_CLINT_SECRET_URL,
            callbackURL: process.env.PROVIDER_GOOGLE_CALLBACK_URL
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
        clientID: process.env.PROVIDER_FACEBOOK_CLINT_ID_URL,
        clientSecret: process.env.PROVIDER_FACEBOOK_CLINT_SECRET_URL,
        callbackURL: process.env.PROVIDER_FACEBOOK_CALLBACK_URL,
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




module.exports = {Googleprovider, facebookProvider};

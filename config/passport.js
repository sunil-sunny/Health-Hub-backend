/* @author Avinash Gazula <agazula@dal.ca> */

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//User model 
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
            //Check if User exists
            let type = req.body.type;
            User.findOne({ type, email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Email is not registered' })
                    }

                    bcrypt.compare(password, user.password, (err, success) => {
                        if (err) throw err;
                        if (success) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Password incorrect' })
                        }
                    })
                })
                .catch(err => console.error(err))
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
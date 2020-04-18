
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    passport=require("passport")
var opts = {}
const mongoose=require("mongoose")
const User=require("../model/User")

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports=passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    User.findOne({_id:mongoose.Types.ObjectId(jwt_payload._doc._id)}, function(err, user) {
      
        if (err) {
            return done(err, false);
        }
        if (user) {

            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


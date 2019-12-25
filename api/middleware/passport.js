const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys.dev');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwtSecret,
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                // const user = await User.findById(payload._id);
                const user = {
                    name: 'Edward',
                    passport: '123123'
                }
                
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (err) {
                console.log(err);
            }
        })
    )
}
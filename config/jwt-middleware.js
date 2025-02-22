import User from '../models/User.js'
import JWT from 'passport-jwt' 

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRETORKEY
}

export const passportAuth = (passport) => {
    passport.use(
        new JwtStrategy(
            opts, async (jwt_payload, done) => {
                try {
                    const user = await User.findById(jwt_payload.id);
                    
                    if (user) {
                        return done(null, user)};
                    return done(null, false);
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    )
}
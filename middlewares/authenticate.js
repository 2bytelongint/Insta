import passport from "passport";

export const authenticate =(req, res, next) => {
    
    passport.authenticate('jwt',{ session: false }, (err, user,info) => {
        
        if(err) return res.status(500).json({ message: "Server error" });;

        if(!user){
            return res.status(401).json({ 
                message: "Unauthorized access" ,
                error: info ? info.message : "No user found"
            });
        }

        req.user = user;
        next();
    })(req,res,next)
}
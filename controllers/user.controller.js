import UserService from "../services/user-service.js";

const userService = new UserService();

export const register = async(req, res) => {
    try {
        const {userName, email, password} = req.body;
        if (!userName || !email || !password){
            return res.status(401).json({
                message : "Please fill up all credentials",
                success : false
            })
        }

        const user = await userService.findOne(email);
        if(user){
            return res.status(401).json({
                message : "Email already exists",
                success : false
            })
        }
        const response = await userService.signUp({
            email,
            userName,
            password
        })

        return res.status(200).json({
            message : "Successfully created an user",
            success : true,
            data : response,
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            message : "Something went wrong in the user-controller level",
            success : false,
            data : {},
            err : error.message
        })
    }
}
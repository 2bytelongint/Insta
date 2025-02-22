import FollowService from "../services/followService.js";
import UserService from "../services/user-service.js";

const userService = new UserService();
const followService = new FollowService();

export const register = async(req, res) => {
    try {
        const {userName, email, password} = req.body;
        
        
        
        if (!userName || !email || !password){
            return res.status(401).json({
                message : "Please fill up all credentials",
                success : false
            })
        }

        const user = await userService.findUserByEmail(email);
        if(user){
            return res.status(401).json({
                message : "Email already exists",
                success : false
            })
        }
        let profilePhoto = '';
        if (req.file) {
            profilePhoto = req.file.buffer;
        } else {
            console.log("No file uploaded");
        }
        const response = await userService.signUp({
            email,
            userName,
            password,
            profilePhoto
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

export const signin = async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(500).json({
                message : "Please fill up all credentials",
                success : false
            })
        }

        const token = await userService.signin({email, password});
        return res.status(200).json({
            message : "Successfully sign in a user",
            success : true,
            data : token,
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

export const getProfile = async (req,res) => {
    try {
        const {email} = req.body
        const user = await userService.findUserByEmail(email);
        if(!user){
            return res.status(500).json({
                message : "User not found. Try with correct email",
                success : false
            })
        }
        return res.status(200).json({
            message : "Successfully fetched a user",
            success : true,
            data : user,
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

export const getOthersProfile = async(req, res) => {
    try {
        const {userName} = req.body;
        console.log(userName);
        
        const user = await userService.findUserByUserName(userName);
        if(!user){
            return res.status(500).json({
                message : "UserName not found. Try with correct username",
                success : false
            })
        }
        return res.status(200).json({
            message : "Successfully fetched a user",
            success : true,
            data : user,
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

export const follow = async (req,res) => {
    try {
        const userId = req.user.id;
        const followId = req.params.id;
        if(userId === followId){
            return res.status(400).json({
                message : "You cannot follow/unfollow yourself",
                success : false
            })
        }

       
        
        
        const response = await followService.follow(userId, followId);
        return res.status(200).json({
            message : response,
            success : true
        })

        
    } catch (error) {
        return res.status(500).json({
            message : "Something is wrong in user control level",
            success : true,
            data : {},
            err : error
        })
    }
}
import User from '../models/User.js';
import CrudRepository from "./crud-repo.js";
class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async getByEmail(email){
        try {
            const reponse = await User.findOne({email})
            return reponse;
        } catch (error) {
            console.log("Something went wrong in of the repo level");
            throw error.message;
        }
    }

    async getByUserName(username){
        try {
            const reponse = await User.find({userName : { $regex: `${username}`, $options: "i" }}).select('-__v -password -bookmarks -createdAt -updatedAt');
            return reponse;
        } catch (error) {
            console.log("Something went wrong in of the repo level");
            throw error.message;
        }
    }

    async getById(userId){
        try {
            const reponse = await User.findById(userId);
            return reponse;
        } catch (error) {
            console.log("Something went wrong in of the repo level");
            throw error.message;
        }
    }
}

export default UserRepository;
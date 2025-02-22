import {UserRepository} from '../repo/index.js';
import UploadService from "./upload-service.js";
class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(data){
        try {
            let profilePhoto = '';
            
            if (data.profilePhoto) {
                const userId = data.email || data.userName; // Use email or userName as an identifier
                profilePhoto = await UploadService.uploadImage(data.profilePhoto, userId, "profile");
              }
           
            
            
            data.profilePhoto = profilePhoto;
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the user-service level");
            
        }
    }

    async signin(data){
        try {
            console.log("User : ")
            const user = await this.findUserByEmail(data.email);
            
            console.log(data.email);
            
            if(!user){
                throw {
                    message: 'no user found'
                };
            }

            const isMatch = await user.isPasswordMatched(data.password);
            console.log("isMatch", isMatch);
            

            if(!isMatch){
                throw {
                    message: 'Wrong Password'
                };
            }

            console.log("token");
            
            const token = await user.genJWT();
            console.log(token);
            return token;
        } catch (error) {
            console.log("Something went wrong in the sign in of user-service level");
        }
    }

    async findUserByEmail(email){
        try {
            const user = await this.userRepository.getByEmail(email);
            
            return user;
        } catch (error) {
            console.log("Something went wrong in the findOne function of user-service level");
            
        }
    }

    async findUserByUserName(userName){
        try {
            const user = await this.userRepository.getByUserName(userName);
            return user;
        } catch (error) {
            console.log("Something went wrong in the findOne function of user-service level");
            
        }
    }

    async findUserById(id){
        try {
            const user = await this.userRepository.getById(id);
            return user;
        } catch (error) {
            console.log("Something went wrong in the findOne function of user-service level");
        }
    }

}

export default UserService;
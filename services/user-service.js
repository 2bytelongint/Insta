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
                profilePhoto = await UploadService.uploadImage(data.profilePhoto, userId);
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
            const user = await this.findOne(data.email);
            
            console.log(data.email);
            
            if(!user){
                throw {
                    message: 'no user found'
                };
            }

            const isMatch = await user.isPasswordMatched(data.password);
            console.log(isMatch);
            

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

    async findOne(email){
        try {
            const user = await this.userRepository.getByEmail(email);
            return user;
        } catch (error) {
            console.log("Something went wrong in the user-service level");
            
        }
    }

}

export default UserService;
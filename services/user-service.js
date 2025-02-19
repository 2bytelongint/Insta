import {UserRepository} from '../repo/index.js';

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the user-service level");
            
        }
    }

    async findOne(data){
        try {
            const user = await this.userRepository.findOne(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the user-service level");
            
        }
    }
}

export default UserService;
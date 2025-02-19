import User from '../models/User.js';
import CrudRepository from "./crud-repo.js";

class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }
}

export default UserRepository;
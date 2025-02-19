class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in creation of the repo level");
            console.log(error.message);
            
        }
    }

    async findOne(data){
        try {
            const reponse = await this.model.findOne({data});
            return reponse;
        } catch (error) {
            console.log("Something went wrong in of the repo level");
            throw error.message;
        }
    }
}

export default CrudRepository;
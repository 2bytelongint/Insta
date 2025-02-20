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

    
}

export default CrudRepository;
import { Post } from "../models/Post.js";

class PostRepository{
    async create(data){
        try {
            const post = await Post.create(data);
            return post;
        } catch (error) {
            console.log("Something went wrong in the creation of post-repo level");
            throw error.message;
        }
    }
}

export default PostRepository;
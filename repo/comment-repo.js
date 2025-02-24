import { Comment } from "../models/Comment.js";

class CommentRepository{
    async createComment(data){
        try {
            const comment = await Comment.create(data);
            return comment;
        } catch (error) {
            console.log("Something went wrong in the creation of comment-repo level");
            throw error.message;
        }
    }

    async findById(id){
        try {
            const comment = await Comment.findById(id);
            return comment;
        } catch (error) {
            console.log("Something went wrong in the findById of comment-repo level");
            throw error.message;
        }
    }
}

export default CommentRepository;
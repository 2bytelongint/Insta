import { CommentRepository, PostRepository } from "../repo/index.js"

class CommentService{
    constructor(){
        this.commentRepository = new CommentRepository();
        this.postRepository = new PostRepository();
    }

    async create(modelType, modelId, userId, content){
        try {
            if(modelType == 'Comment'){
                var commentable = await this.commentRepository.findById(modelId);
            }else if(modelType == 'Post'){
                var commentable = await this.postRepository.findPostById(modelId);
            }else{
                throw new Error('unknown model type');
            }
            
            const newComment = await this.commentRepository.createComment({
                content : content,
                onModel : modelType,
                author : userId,
                commentable : modelId
            });
            
            if(modelType === 'Post'){
                commentable.comments.push(newComment);
            }else{
                commentable.replies.push(newComment);
            }

            await commentable.save();
            
            return newComment;
        } catch (error) {
            console.log("Something went wrong in the comment-service level");
            throw error;
        }
    }
}

export default CommentService;
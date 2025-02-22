import {PostRepository} from '../repo/index.js'
import uploadService from './upload-service.js';
class PostService{
    constructor(){
        this.postRepository = new PostRepository();
    }

    async createPost(data){
        try {
            let imageUrl = '';
            const userId = data.userId;
            const fileBuffer = data.photo;

            if(fileBuffer){
                imageUrl = await uploadService.uploadImage(fileBuffer, userId, "post");
            }

            const post = await this.postRepository.create({
                caption : data.caption,
                image : imageUrl,
                author : userId
            })
            return post;
        } catch (error) {
            console.log("Something went wrong in the post-service level");
        }
    }
}

export default PostService;
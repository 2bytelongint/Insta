import {PostRepository} from '../repo/index.js'
import uploadService from './upload-service.js';
import {UserRepository} from '../repo/index.js';

class PostService{
    constructor(){
        this.postRepository = new PostRepository();
        this.userRepository = new UserRepository();
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
            const user = await this.userRepository.getById(userId);
            console.log(user);
            
            user.posts.push(post._id);
            await user.save();

            return post;
        } catch (error) {
            console.log("Something went wrong in the post-service level");
        }
    }

    async findAllPost(){
        try {
            const posts = await this.postRepository.getAll();
            return posts;
        } catch (error) {
            console.log("Something went wrong in the post-service level");
        }
    }

    async findUserPost(userId){
        try {
            const posts = await this.postRepository.findPostByUserId(userId);
            return posts;
        } catch (error) {
            console.log("Something went wrong in the post-service level");
        }
    }
}

export default PostService;
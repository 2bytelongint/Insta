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

    async findPostById(postId){
        try {
            const post = await Post.findById(postId).populate({
                path : 'author',
                select : '-password -email -bookmarks -createdAt -updatedAt -__v'
            });
            return post;
        } catch (error) {
            console.log("Something went wrong in the findPostById function of post-repo level");
            throw error.message;
        }
    }

    async getAll(){
        try {
            const posts = await Post.find().sort({
                createdAt: -1
            })
            .populate({path : 'author', select : 'userName profilePhoto -_id'})
            .populate({
                path: "comments",
                populate: [
                    {
                        path: "author",
                        select: "userName profilePhoto -_id",
                    },
                    {
                        path: "replies",
                        populate: {
                            path: "author",
                            select: "userName profilePhoto -_id",
                        },
                    },
                ],
            })
            .lean().exec();
            return posts;
        } catch (error) {
            console.log("Something went wrong in the getAll function of post-repo level");
            throw error.message;
        }
    }

    async findPostByUserId(userId){
        try {
            const post = await Post.find({
                author : userId
            }).sort({
                createdAt: -1
            })
            .populate({path : 'author', select : 'userName profilePhoto -_id'}).select('-createdAt -updatedAt -__v');
            return post;
        } catch (error) {
            console.log("Something went wrong in the findPostByUserId function of post-repo level");
            throw error.message;
        }
    }
}

export default PostRepository;
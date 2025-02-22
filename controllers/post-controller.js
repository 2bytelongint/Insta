import PostService from "../services/post-service.js";

const postService = new PostService();

export const createPost = async(req,res) => {
    try {
        const userId = req.user.id;
        const {caption} = req.body;
        console.log(caption);
        

        if(!req.file){
            return res.status(400).json({
                message : "There is no Image to upload",
                success : false
            })
        }
        const photo = req.file.buffer;

        const post = await postService.createPost({
            userId, caption, photo
        });

        return res.status(201).json({
            message : "Post Uploaded",
            success : true,
            data : post
        })
    } catch (error) {
        return res.status(500).json({
            message : "Error in creating post",
            success : false,
            data : {},
            err : error.message
        })
    }
}
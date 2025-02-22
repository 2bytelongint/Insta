import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },

    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    onModel : {
        type : String,
        required : true,
        enum : ['Post', 'Comment']
    },

    commentable : {
        type : mongoose.Schema.Types.ObjectId,
        refPath : 'onModel',
        required : true
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
},
{
    timestamps : true
}
)


export default Comment = mongoose.model('Comment', commentSchema)
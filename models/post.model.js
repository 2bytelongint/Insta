import {mongoose} from 'mongoose' // Erase if already required


const postSchema = new mongoose.Schema({
    caption : {
        type : String,
        default : ''
    },
    image : {
        type : String,
        required : true
    },

    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],

    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
});

//Export the model
export const Post = mongoose.model('Post', postSchema);
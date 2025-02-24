import  mongoose  from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
    },

    profilePhoto : {
        type : String,
        default : ""
    },

    bio : {
        type : String,
        default : ""
    },

    gender : {
        type : String,
        enum : ['male', 'female']
    },

    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],

    followings : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],

    posts :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Post'
        } 
    ],

    bookmarks : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Post'
        }
    ]
},
{
    timestamps : true
})



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password is modified

    const salt = await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password, salt); // ✅ Await the hashing process

    next();
});

userSchema.methods.isPasswordMatched = async function(plainPassword){
    return bcrypt.compare(plainPassword,this.password)
}

userSchema.methods.genJWT = function() {
    return jwt.sign({id : this._id, email : this.email}, process.env.SECRETORKEY, {
        expiresIn : '100hr'
    })
}

const User = mongoose.model('User', userSchema);
export default User;
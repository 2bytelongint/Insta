import { UserRepository } from "../repo/index.js";

class FollowService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async follow(userId, followId){
        try {
            const user = await this.userRepository.getById(userId);
            const follower = await this.userRepository.getById(followId);

            const isFollowing = user.followings.includes(followId);
            if(isFollowing){
            user.followings.pull(followId);
            follower.followers.pull(userId);
            }
            else{
            user.followings.push(followId);
            follower.followers.push(userId);
            }
            await follower.save();
            await user.save();

            return { message: isFollowing ? "Unfollowed successfully" : "Followed successfully" };
        } catch (error) {
            console.error("❌ Error in follow service:", error.message);
            throw error;
        }
    }
}

export default FollowService;
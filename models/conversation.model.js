import { mongoose } from "mongoose";

const convoSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

export default Convo = mongoose.model("Conversation", convoSchema);

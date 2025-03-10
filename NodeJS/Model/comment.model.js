import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"video",
        require: true
    },
    commentBody: {
        type: String,
        require: true
    },
    likes: {
        type: Number,
        default: 0
    }
});

const commentModel = mongoose.model("comment",commentSchema);
export default commentModel;
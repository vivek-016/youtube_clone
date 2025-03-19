import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"video",
        required: true
    },
    commentBody: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
});

const commentModel = mongoose.model("comment",commentSchema);
export default commentModel;
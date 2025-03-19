import mongoose from "mongoose";



const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "channel",
        required: true
    },
    categories: [{
        type: String,
    }],
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    subscribers: {
        type: Number
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }]
})

const videosModel = mongoose.model("video", videoSchema);
export default videosModel;
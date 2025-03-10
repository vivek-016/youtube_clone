import mongoose from "mongoose";



const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    thumbNailUrl: {
        type: String,
        require: true
    },
    videoUrl: {
        type: String,
        require: true
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "channel",
        require: true
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
        require: true
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
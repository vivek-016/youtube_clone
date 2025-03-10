import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true,
        unique: true,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    channelBanner: {
        type: String
    },
    subscribers: {
        type: Number,
        default: 0
    },
    videos: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "video" 
    }]
})

const channelModel = mongoose.model("channel",channelSchema);
export default channelModel;
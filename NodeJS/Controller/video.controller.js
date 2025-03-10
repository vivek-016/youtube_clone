import { useParams } from "react-router-dom";
import videosModel from "../Model/videos.model.js";
import channelModel from "../Model/channel.model.js";
import mongoose from "mongoose";

export async function uploadVideo(req,res){
    try{
        const {channelId} = req.params;
        const {title, thumbNailUrl, videoUrl, views, likes, dislikes, description, comments} = req.body;
    
        // valiate video
        if(!videoUrl){
            return res.status(400).json({message:"Url can not be empty."});
        }
    
        const newVideo = new videosModel({
            title: title,
            thumbNailUrl: thumbNailUrl,
            videoUrl: videoUrl,
            channel: channelId,
            views: views,
            likes: likes,
            dislikes: dislikes,
            description: description,
            comments: comments
        })
    
        const savedVideo = await newVideo.save();

        // Update the channel collection by adding videoID
        await channelModel.findByIdAndUpdate(channelId,{
            $push: {videos: savedVideo._id}
        })

        return res.status(201).json({message:"video added successfully", video: savedVideo});
    } catch(error){
        return res.status(500).json({message:"server error", error: error.message});
    }
}

export async function deleteVideo(req,res){
    try{
        const {channelId, videoId} = req.params;

        const video = await videosModel.findById(videoId);
        // Checking if the video exists
        if(!video){
            return res.status(400).json({message: "video not found"});
        }

        // removing from videos collection
        await videosModel.findByIdAndDelete(videoId);

        // removing the video id from channel
        await channelModel.findByIdAndUpdate(channelId,{
            $pull: {videos: videoId}
        })
        res.status(200).json({message: "video deleted successfully"});
    } catch(error){
        res.ststus(500).json({message:"error deleting video", error});
    }

    
}

export async function fetchVideos(req,res){
    try{
        const data = await videosModel.find()
            .populate("channel");
           

        if(!data||data.length==0){
            return res.status(400).json({message: "No data found"});
        }
        res.status(200).json(data);
    }catch(error){
        return res.status(500).json({message:"server error", error: error.message});
    }
}

export async function fetchVideo(req, res) {
    try {
        const videoId = req.params.videoId;  

        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({ message: "Invalid ObjectId" });
        }

        const videoData = await videosModel.findById(videoId)
            .populate("channel")
            .populate({
                path: "comments",
                populate: { path: "user", select: "userName avatar" }, // Populate user inside comments
              });

        if (!videoData) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.status(200).json(videoData); 

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

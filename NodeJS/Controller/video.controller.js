import { useParams } from "react-router-dom";
import videosModel from "../Model/videos.model.js";
import channelModel from "../Model/channel.model.js";
import mongoose from "mongoose";

export async function uploadVideo(req,res){
    try{
        const {channelId} = req.params;
        const {title,categories, thumbnailUrl, videoUrl, views, likes, dislikes, description, comments} = req.body;
    
        // valiate video
        if(!videoUrl){
            return res.status(400).json({message:"Url can not be empty."});
        }
        
        // creating new video data
        const newVideo = new videosModel({
            title,
            thumbnailUrl,
            videoUrl,
            channel: channelId,
            categories,
            views,
            likes,
            dislikes,
            description,
            comments
        })
        // saving new video to data base
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
        // finding video data with populated channel data
        const data = await videosModel.find()
            .populate("channel"); //populating video data with channel
           
        // validating fetched data
        if(!data||data.length==0){
            return res.status(400).json({message: "No data found. Add some videos to watch"});
        }
        res.status(200).json(data);
    }catch(error){
        return res.status(500).json({message:"server error", error: error.message});
    }
}

export async function fetchVideo(req, res) {
    try {
        const videoId = req.params.videoId;  

        // validating videoId
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({ message: "Invalid ObjectId" });
        }
        // finding video data with populated channel data and userName, avatar in user from comments
        const videoData = await videosModel.findById(videoId)
            .populate("channel")
            .populate({
                path: "comments",
                populate: { path: "user", select: "userName avatar" }, // Populate user inside comments
              });
        // validating fetched data
        if (!videoData) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.status(200).json(videoData); 

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export async function updateVideo(req,res){
    try{
        const {video_id} = req.params;

        const {title,categories, thumbnailUrl, videoUrl, description} = req.body;
    
        // find and update video
        const updatedVideo = await videosModel.findByIdAndUpdate(video_id,{
            title,
            thumbnailUrl,
            videoUrl,
            categories,
            description,
        });

        // validate updated video
        if(!updatedVideo){
            return res.status(404).json({message:"Video not found"});
        }

        return res.status(200).json({message:"video updated successfully"});


    }catch(error){
        return res.status(500).json({message:"Server Error"});
    }
}

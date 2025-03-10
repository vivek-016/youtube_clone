import channelModel from "../Model/channel.model.js";

export function createChannel(req,res){
    const {channelName, user, description, channelBanner, subscribers, videos} = req.body;

    const newChannel = new channelModel({
        channelName: channelName,
        user: user,
        description: description,
        channelBanner: channelBanner,
        subscribers: subscribers,
        videos: videos
    })

    newChannel.save().then(data=>{
        if(!data){
            return res.status(400).json({message:"Something went wrong"})
        }
        res.send(data);
    })
}
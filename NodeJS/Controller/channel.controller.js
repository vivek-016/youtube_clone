import channelModel from "../Model/channel.model.js";
import userModel from "../Model/user.model.js";

export async function createChannel(req, res) {
    try {
        const { channelName, description, channelBanner, subscribers, videos } = req.body;
        const userId = req.body.user;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Create a new channel
        const newChannel = new channelModel({
            channelName,
            user: userId,
            description,
            channelBanner,
            subscribers,
            videos,
        });

        // saving the channel to database
        const savedChannel = await newChannel.save();
        // checking if the channel saved
        if (!savedChannel) {
            return res.status(400).json({ message: "Failed to create channel" });
        }

        // Updating user's channel field
        await userModel.findByIdAndUpdate(userId, { channel: savedChannel._id });

        return res.status(201).json(savedChannel);
    } catch (error) {
        console.error("Error creating channel:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export async function getChannel(req,res){
    try{


        const {_id} = req.params;

        // finding channel
        const channel = await channelModel.findById(_id);
        
        if(!channel){
            return res.status(404).json({message:"Channel not found"})
        }
        
        res.status(200).json(channel);

    }catch(error){
        console.error("Error fetching channel: ",error);
        res.status(500).json({message:"Internal server error"})
    }
};
import commentModel from "../Model/comment.model.js";
import videosModel from "../Model/videos.model.js";

export async function addComment(req, res) {

    

    try {
        const { videoId } = req.params;
        const { user, commentBody, likes } = req.body;

        // Validate comment
        if (!commentBody) {
            return res.status(400).json({ message: "Comment cannot be empty" });
        }

        // Create and save the comment
        const newComment = new commentModel({
            user: user,
            video: videoId,
            commentBody: commentBody,
            likes: likes
        });

        const savedComment = await newComment.save(); // Wait for the comment to be saved

        // Update the video document by adding the comment ID
        await videosModel.findByIdAndUpdate(videoId, {
            $push: { comments: savedComment._id }
        });

        return res.status(201).json({ message: "Comment added successfully", comment: savedComment });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export async function deleteComment(req,res){
    try {
        const {videoId, commentId} = req.params;

        const comment = await commentModel.findById(commentId);
        // checking if comment exist
        if(!comment){
            return res.status(400).json({message:"Comment not found"});
        }

        // delete from comments collection
        await commentModel.findByIdAndDelete(commentId);

        // removing the comment reference from video
        await videosModel.findByIdAndUpdate(videoId,{
            $pull: {comments: commentId}
        });
        

        res.status(200).json({message:"comment deleted successfully"})
    } catch(error){
        res.status(500).json({message:"Error deleting comment",error});
    }
}

export async function editComment(req,res){
    try{

        const {comment_id,commentBody} = req.body;

        const updatedComment = await commentModel.findByIdAndUpdate(comment_id,{
            commentBody
        },
        {new:true}
    );

        if(!updatedComment){
            return res.status(404).json({message:"Comment Not found"});
        }

        return res.status(200).json({message:"Comment updated successfully",updatedComment});

    }catch(error){
        return res.status(500).json({message:"Server Error"});
    }
}

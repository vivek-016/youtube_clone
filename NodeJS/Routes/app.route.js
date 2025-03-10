import { createChannel } from "../Controller/channel.controller.js";
import { addComment, deleteComment } from "../Controller/comment.controller.js";
import { createUser } from "../Controller/user.controller.js"
import { deleteVideo, fetchVideos, uploadVideo, fetchVideo } from "../Controller/video.controller.js";
import { loginUser } from "../Controller/auth.controller.js";
import { authenticateToken } from "../Middleware/authMiddleware.js";

export function routes(app){
    app.post("/api/user", createUser);
    app.post("/api/login", loginUser);
    app.post("/api/channel", createChannel);
    app.post("/api/channel/:channelId/video", uploadVideo)
    app.post("/api/videos/:videoId/comments",authenticateToken, addComment);
    app.delete("/api/videos/:videoId/comments/:commentId",authenticateToken, deleteComment);
    app.delete("/api/channel/:channelId/video/:videoId",deleteVideo);
    app.get("/api/videos",fetchVideos);
    app.get("/api/videos/:videoId",fetchVideo);
}


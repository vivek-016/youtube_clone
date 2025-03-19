import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchVideo from "../utils/useFetchVideo.js";

function EditVideo() {
    const { video_id } = useParams();
    const { video, videoLoading, videoError } = useFetchVideo(`http://localhost:3000/api/videos/${video_id}`);
    const navigate = useNavigate();

    const [videoData, setVideoData] = useState({
        title: "",
        thumbnailUrl: "",
        videoUrl: "",
        categories: [],
        description: ""
    });

    const [loading, setLoading] = useState(false);

    //  Update videoData once video is fetched
    useEffect(() => {
        if (video) {
            setVideoData({
                title: video.title || "",
                thumbnailUrl: video.thumbnailUrl || "",
                videoUrl: video.videoUrl || "",
                categories: video.categories || [],
                description: video.description || ""
            });
        }
    }, [video]); // Runs when `video` updates

    // 🔹 Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoData((prev) => ({
            ...prev,
            [name]: name === "categories" ? value.split(",").map(cat => cat.trim()): value
        }));
    };

    //  Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/videos/${video_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...videoData,
                    categories: Array.isArray(videoData.categories) 
                    ? videoData.categories 
                    : videoData.categories.split(",").map((cat) => cat.trim())
                })
            });

            if (!response.ok) {
                throw new Error("Error updating video");
            }

            alert("Video updated successfully!");
            navigate("/Channel");

        } catch (error) {
            console.error("Error updating video:", error);
        } finally {
            setLoading(false);
        }
    };

    //  Loading state
    if (videoLoading) {
        return (
            <div className="flex h-[94vh] w-screen items-center justify-center">
                <h1 className="text-[70px] font-bold">Loading...</h1>
            </div>
        );
    }

    //  Error state
    if (videoError) {
        return (
            <div className="flex h-[94vh] w-screen items-center justify-center">
                <h1 className="text-[60px] font-bold"><span className="text-red-600">Error:</span> {videoError}</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Edit Video</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={videoData.title} onChange={handleChange} required />
                <input type="text" name="thumbnailUrl" placeholder="Thumbnail URL" value={videoData.thumbnailUrl} onChange={handleChange} required />
                <input type="text" name="videoUrl" placeholder="Video URL" value={videoData.videoUrl} onChange={handleChange} required />
                <input type="text" name="categories" placeholder="Categories (comma-separated)" value={videoData.categories.join(", ")} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={videoData.description} onChange={handleChange} required />
                <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Video"}</button>
            </form>
        </div>
    );
}

export default EditVideo;

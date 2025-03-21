import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchVideo from "../utils/useFetchVideo.js";

function EditVideo() {
  const { video_id } = useParams();
  const { video, videoLoading, videoError } = useFetchVideo(
    `http://localhost:3000/api/videos/${video_id}`
  );
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState({
    title: "",
    thumbnailUrl: "",
    videoUrl: "",
    categories: [],
    description: "",
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
        description: video.description || "",
      });
    }
  }, [video]); // Runs when `video` updates

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prev) => ({
      ...prev,
      [name]:
        name === "categories"
          ? value.split(",").map((cat) => cat.trim())
          : value,
    }));
  };

  //  Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/videos/${video_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...videoData,
            categories: Array.isArray(videoData.categories)
              ? videoData.categories
              : videoData.categories.split(",").map((cat) => cat.trim()),
          }),
        }
      );

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
        <h1 className="text-[60px] font-bold">
          <span className="text-red-600">Error:</span> {videoError}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Edit Video</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter video title"
              value={videoData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail URL
            </label>
            <input
              type="text"
              name="thumbnailUrl"
              placeholder="Enter thumbnail URL"
              value={videoData.thumbnailUrl}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video URL
            </label>
            <input
              type="text"
              name="videoUrl"
              placeholder="Enter video URL"
              value={videoData.videoUrl}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categories (comma-separated)
            </label>
            <input
              type="text"
              name="categories"
              placeholder="Enter categories"
              value={videoData.categories.join(", ")}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter video description"
              value={videoData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 cursor-pointer"
              onClick={() => navigate("/Channel")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer ${
                loading && "opacity-70 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditVideo;

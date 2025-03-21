import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";



function UploadVideo(){

    const {channel_id} = useParams();
    const [videoData,setVideoData] = useState({
        title:"",
        thumbnailUrl:"",
        videoUrl:"",
        channel:{channel_id},
        categories:[],
        description:""
    });

    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setVideoData({...videoData,[name]:value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{

            const response = await fetch(`http://localhost:3000/api/channel/${channel_id}/video`,{
                method:"POST",
                headers: {
                    "content-Type":"application/json"
                },
                body: JSON.stringify({
                    ...videoData,
                    categories: videoData.categories.split(",").map((cat)=>cat.trim())
                })
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error("Error uploading video");
            }

            setVideoData({title:"",thumbnailUrl:"",videoUrl:"",categories:[],description:""});
            alert("Video added successfully");
            navigate("/Channel");

        }catch(error){
            console.error("error uploading video:",error);
        }finally{
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Add Video</h1>
        <form onSubmit={(e) => handleSubmit(e, videoData)} className="space-y-6">
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
              value={videoData.categories}
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
              type="reset"
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 cursor-pointer"
              onClick={() => setVideoData({ title: "", thumbnailUrl: "", videoUrl: "", categories: "", description: "" })}
            >
              Clear
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer ${loading && "opacity-70 cursor-not-allowed"}`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}
export default UploadVideo;
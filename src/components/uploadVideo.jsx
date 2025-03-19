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
        <div>
            <h1>Add Video</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={videoData.title} onChange={handleChange} required />
                <input type="text" name="thumbnailUrl" placeholder="thumbnailUrl" value={videoData.thumbnailUrl} onChange={handleChange} required />
                <input type="text" name="videoUrl" placeholder="Video Url" value={videoData.videoUrl} onChange={handleChange} required/>
                <input type="text" name="categories" placeholder="categories" value={videoData.categories} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={videoData.description} onChange={handleChange} required/>

                <button type="submit" disabled={loading}>{loading?"Uploading...":"Upload Video"}</button>
            </form>
        </div>
    )
}
export default UploadVideo;
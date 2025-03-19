import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";


function AddChannel(){

    const [channelName,setChannelName] = useState("");
    const [description,setDescription] = useState("");
    const [channelBanner,setChannelBanner] = useState("");
    const navigate = useNavigate();

    const [user,setUser] = useState(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const handleAddChannel = async ()=>{
        if(!user){
            alert("You must login to create a channel");
        }
        try{

            const response = await fetch("http://localhost:3000/api/channel",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    channelName,
                    description,
                    channelBanner,
                    user: user._id,
                    subscribers: 0,
                    videos: []
                })
            });

            if(!response.ok){
                throw new Error("failed to create channel");
            }

            const data = await response.json();

            alert("Channel created successfully");

            // updating local storage
            const updatedUser = {...user,channel:data._id};
            localStorage.setItem("user", JSON.stringify(updatedUser));

            navigate("/channel");

        }catch(error){
            console.error("Error creating channel: ",error);
        }
    }

    return(
        <div>
            <h2>Create Your Channel</h2>
            <input
                type="text"
                placeholder="Channel Name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
            />
            <textarea
                placeholder="Channel Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Channel Banner URL"
                value={channelBanner}
                onChange={(e) => setChannelBanner(e.target.value)}
            />
            <button className="cursor-pointer" onClick={handleAddChannel}>Create Channel</button>
        </div>
    )
}

export default AddChannel;
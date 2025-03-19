import { useState, useEffect } from "react";

const useFetchChannel = (url)=>{
    const [channelData,setChannelData] = useState(null);
    const [channelDataLoading,setChannelDataLoading] = useState(true);
    const [fetchedError,setFetchedError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(()=>{

        const fetchChannelData = async ()=>{
            try{

                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (!storedUser||!storedUser.channel){
                    throw new Error("channel not found");
                }

                const response = await fetch(`http://localhost:3000/api/channel/${storedUser.channel}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if(!response.ok){
                    throw new Error("error fetching data");
                }
                const result = await response.json();
                
                setChannelData(result);
            }catch(error){
                setFetchedError(error.message);
            }finally{
                setChannelDataLoading(false);
            }
        }

        fetchChannelData();
    },[url])

    return {channelData,channelDataLoading,fetchedError}
}

export default useFetchChannel;
import { useState, useEffect } from "react";

const useFetchVideos = (url)=>{

    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{


        const fetchData = async ()=>{
            try{
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error('Error fetching data.');
                }
                const result = await response.json();
                setData(result);
            } catch(error){
                setError(error.message);
            } finally{
                setLoading(false);
            }
        };

        fetchData();
    },[url])

    return {data,loading,error};

}

export default useFetchVideos;
import { useState, useEffect } from "react";

const useFetchVideo = (url) => {
    const [video, setVideo] = useState([]);
    const [videoLoading, setLoading] = useState(true);
    const [videoError, setError] = useState(null);

    useEffect(() => {
        if (!url) return;  

        const fetchData = async () => {
            try {
                console.log("Fetching single video from:", url);
                const response = await fetch(url);
                if (!response.ok) {
                    const errorDetails = await response.json();
                    throw new Error(errorDetails.message||`Error fetching data: ${response.statusText}`);
                }
                const result = await response.json();
                console.log("Fetched Video:", result);
                setVideo(result);
            } catch (error) {
                console.error("Fetch error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { video, videoLoading, videoError };
};

export default useFetchVideo;

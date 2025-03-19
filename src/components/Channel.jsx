import ChannelVideoCard from "./channelVideoCard.jsx";
import useFetchVideos from "../utils/useFetchVideos.js";
import { useState,useEffect } from "react";
import { useOutletContext,Link } from "react-router-dom";
import useFetchChannel from "../utils/useFetchChannel.js";

function Channel() {

  const {channelData,channelDataLoading,fetchedError} = useFetchChannel();

  const { data, loading, error } = useFetchVideos(
    "http://localhost:3000/api/videos"
  );
  
  const [selectedFilter,setSelectedFilter] = useState("All");
  const {searchTerm}=useOutletContext();
  const [channelVideos, setChannelVideos] = useState([]);

  // get user information
  const user = JSON.parse(localStorage.getItem("user")); 
    
  const userId = user.channel; 
  


  // filter the videos uploaded from the user's channel
  useEffect(() => {
      if (Array.isArray(data) && data.length > 0 && userId) {
        const userVideos = data.filter((video) => video.channel._id === userId);
        setChannelVideos(userVideos);
      }
    }, [data, userId]);

  
    

  const filteredVideos = channelVideos.filter(
      (video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedFilter === "All" || video.categories.includes(selectedFilter))
    );

    if(channelDataLoading){
      return (
        <p>Loading</p>
      )
    }

    if(loading){
      return <p>Loading...</p>
    }

    if(error){
      return <p>Error fetching videos: {error}</p>
    }
  


  return (
    <div className="text-[2vw] h-[94vh] px-1 md:px-2 lg:px-3 xl:px-4   md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw] flex">
      {/* side bar */}
      <div className="h-[94vh] w-[8vw] md:w-[6vw] lg:w-[5vw] xl:w-[4vw] text-[2vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw]">
        {/* navigation section */}
        {/* home option*/}
        <div className="w-full flex flex-col items-center text-center justify-center py-1.5 sm:py-2 md:py-3 lg:py-4 xl:py-5 rounded-xl hover:cursor-pointer hover:bg-gray-100">
          <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-auto h-[1.2em]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <div className="text-[0.5em] text-center">
              <h2>Home</h2>
            </div>
          </a>
        </div>
        {/* Shorts option */}
        <div className="w-full flex flex-col items-center text-center justify-center py-1.5 sm:py-2 md:py-3 lg:py-4 xl:py-5 rounded-xl hover:cursor-pointer hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
            className="w-auto h-[1.2em]"
          >
            <path
              clipRule="evenodd"
              d="m7.61 15.719.392-.22v-2.24l-.534-.228-.942-.404c-.869-.372-1.4-1.15-1.446-1.974-.047-.823.39-1.642 1.203-2.097h.001L15.13 3.59c1.231-.689 2.785-.27 3.466.833.652 1.058.313 2.452-.879 3.118l-1.327.743-.388.217v2.243l.53.227.942.404c.869.372 1.4 1.15 1.446 1.974.047.823-.39 1.642-1.203 2.097l-.002.001-8.845 4.964-.001.001c-1.231.688-2.784.269-3.465-.834-.652-1.058-.313-2.451.879-3.118l1.327-.742Zm1.993 6.002c-1.905 1.066-4.356.46-5.475-1.355-1.057-1.713-.548-3.89 1.117-5.025a4.14 4.14 0 01.305-.189l1.327-.742-.942-.404a4.055 4.055 0 01-.709-.391c-.963-.666-1.578-1.718-1.644-2.877-.08-1.422.679-2.77 1.968-3.49l8.847-4.966c1.905-1.066 4.356-.46 5.475 1.355 1.057 1.713.548 3.89-1.117 5.025a4.074 4.074 0 01-.305.19l-1.327.742.942.403c.253.109.49.24.709.392.963.666 1.578 1.717 1.644 2.876.08 1.423-.679 2.77-1.968 3.491l-8.847 4.965ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z"
              fillRule="evenodd"
            ></path>
          </svg>
          <div className="text-[0.5em] text-center">
            <h2>Shorts</h2>
          </div>
        </div>
        {/* Subscriptions */}
        <div className="w-full flex flex-col items-center text-center justify-center py-1.5 sm:py-2 md:py-3 lg:py-4 xl:py-5 rounded-xl hover:cursor-pointer hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
            className="w-auto h-[1.2em]"
          >
            <path
              clipRule="evenodd"
              d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z"
              fillRule="evenodd"
            ></path>
          </svg>
          <div className="text-[0.5em] text-center">
            <h2>Subscriptions</h2>
          </div>
        </div>
        {/* Profile */}
        <div className="w-full flex flex-col items-center text-center justify-center py-1.5 sm:py-2 md:py-3 lg:py-4 xl:py-5 rounded-xl hover:cursor-pointer hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-auto h-[1.2em]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <div className="text-[0.5em] text-center">
            <h2>You</h2>
          </div>
        </div>
      </div>
      {/* Channel Page */}
      <div className="h-[93vh] w-full mt-[1vh] flex flex-col ">
        {/* Channel Details & Banner*/}
        <div className="px-[2vw] sm:px-[4vw] md:px-[6vw] lg:px-[8vw] xl:px-[10vw] w-full h-fit  py-[1em]">
          {/* Channel Banner */}
          <div className="w-full h-[13vw] rounded-[1vw] overflow-hidden">
            <img src={channelData.channelBanner} />
          </div>
          {/* Channel Details */}
          <div className="w-full">
            {/* channel Name */}
            <div>
              <h1 className="text-[1.6em] lg:text-[1.8em] xl:text-[2em] py-[0.3em] font-bold">
                {channelData.channelName}
              </h1>
            </div>
            {/* User Name */}
            <div className="flex py-[0.2em]">
              <h2 className="mr-[1em]">{user.userName}</h2>
              <h2 className="mr-[1em]">
                {channelData.subscribers} subscribers
              </h2>
              <h2>{channelData.videos.length} videos</h2>
            </div>
            {/* Channel Description */}
            <div>{channelData.description}</div>
            {/* buttons */}
            <div className="flex py-[0.2em]">
              {/* Add Video button */}  
              <Link to={`/Channel/${user.channel}/AddVideo`}>
                <button className="flex items-center px-[1em] py-[0.3em] rounded-full text-white bg-black cursor-pointer hover:bg-gray-800 mr-[0.5em]">
                  <h1 className="text-[1em]">Add Video</h1>
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Videos */}
        {/* Videos section */}
        <div className="px-[2vw] sm:px-[4vw] md:px-[6vw] lg:px-[8vw] xl:px-[10vw]">
          <div className=" flex flex-wrap items-center justify-evenly">
            {filteredVideos.map((data) => (
              <ChannelVideoCard videoData={data} key={data._id} />
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Channel;

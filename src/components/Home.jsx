import { useRef, useState, useEffect,useMemo } from "react";
import { mockData } from "../utils/mockData.js";
import { useOutletContext } from "react-router-dom";
import VideoCard from "./videoCard.jsx";
import useFetchVideos from "../utils/useFetchVideos.js";

function Home() {
  const filters = [
    "All",
    "Advertisement",
    "Gaming",
    "HBO",
    "GOT",
    "Valorant",
    "Kids",
    "Tv",
    "TeluguMemes",
    "Google",
    "React",
    "Music",
    "Cartoon",
    "Sports",
    "Stories",
    "Movie",
    "Tech",
    "News",
    "play",
    "Chrome"
  ];

  const{data,loading,error} = useFetchVideos("http://localhost:3000/api/videos");



  const [videos,setVideos] = useState([]);
  useEffect(()=>{
    if(Array.isArray(data)&&data.length>0){
      setVideos(data);
    }
  },[data]);

  
  

  const [selectedFilter,setSelectedFilter] = useState("All");
  const [pos, setPos] = useState(0);
  const {searchTerm}=useOutletContext();
  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFilter === "All" || video.categories.includes(selectedFilter))
  );
  const handleFilterClick = (category) => {
    if (selectedFilter !== category) {
      setSelectedFilter(category);
    }
  };

  
  
  
  const divRef = useRef(null);
  const containerRef = useRef(null);
  const [listWidth, setListWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (divRef.current && containerRef.current) {
      setListWidth(divRef.current.scrollWidth);
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, [filters,videos]);

  const moveLeft = () => {
    setPos((prev) => Math.min(prev + 50, 0)); // Move right
  };

  const moveRight = () => {
    setPos((prev) => Math.max(prev - 50, containerWidth - listWidth)); // Move left but prevent overflow
  };

  if(loading){
    return(
      <div className="flex h-[94vh] w-screen items-center justify-center">
        <h1 className="text-[70px] font-bold">Loading</h1>
      </div>
      
    );
  }

  if(error){
    return(
      <div className="flex h-[94vh] w-screen items-center justify-center">
        <h1 className="text-[60px] font-bold"><span className="text-red-600">Error:</span>{error}</h1>
      </div>
      
    )
  }

  return (
    <div className="flex h-[94vh]">
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
      {/* Home page section */}
      <div className="w-[92vw] md:w-[94vw] lg:w-[95vw] xl:w-[96vw] mt-[1vh] flex items-center mx-2 flex-col">

        {/* filter section */}
        <div className="h-[5vh] w-full flex items-center">
          {/* Left Scroll Button */}
          <button
            className={`p-2 rounded-full cursor-pointer hover:bg-gray-300 ${
              pos < 0 ? "visible" : "hidden"
            } `}
            onClick={moveLeft}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-auto w-[1.2em]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Filter Options */}
          <div
            ref={containerRef}
            className="w-full h-full flex items-center overflow-hidden relative"
          >
            {/* Left Blur */}
            <div
              className={`absolute left-0 top-0 h-full w-5 bg-gradient-to-r from-white to-transparent pointer-events-none z-1 ${
                pos < 0 ? "visible" : "hidden"
              }`}
            ></div>
            <div
              ref={divRef}
              className="flex absolute transition-transform duration-300"
              style={{ transform: `translateX(${pos}px)` }}
            >
              {filters.map((item, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 text-[2vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw] hover:cursor-pointer  rounded-md mx-1.5 max-h-[2em] flex items-center flex-nowrap focus:bg-black focus:text-white ${selectedFilter==item?"bg-black text-white": "bg-gray-200 text-black"}`}
                  onClick={()=>handleFilterClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            {/* Right Blur */}
            <div
              className={`absolute right-0 top-0 h-full w-5 bg-gradient-to-l from-white to-transparent pointer-events-none z-1 ${
                pos <= containerWidth - listWidth ? "hidden" : "visible"
              }`}
            ></div>
          </div>

          {/* Right Scroll Button */}
          <button
            className={`p-2 rounded-full hover:cursor-pointer hover:bg-gray-300 ${
              pos <= containerWidth - listWidth ? "hidden" : "visible"
            } `}
            onClick={moveRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-auto w-[1.2em]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        {/* Videos section */}
        <div className="flex flex-wrap items-center justify-evenly">
          
            {filteredVideos.map((data)=>(
              <VideoCard videoData = {data} key={data._id}/>
            ))}
        </div>
      </div>
    </div>
  );
}
export default Home;

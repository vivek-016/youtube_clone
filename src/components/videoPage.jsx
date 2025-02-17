import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { mockData } from "../utils/mockData.js";
import { useState, useRef, useEffect } from "react";
import MoreVideos from "./moreVideos.jsx";

function VideoPage() {
  const params = useParams();
  const videoData = mockData.find((data) => data.id === params.id);
  const formatLikes = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };
  const [showMore, setShowMore] = useState(false);
  const description = videoData.description;
  const max_length = 150;
  const [commentInput, setCommentInput] = useState("");
  const [isCommentFocus, setIsCommentFocus] = useState(false);
  const handleCommentCancel = () => {
    setCommentInput("");
    setIsCommentFocus(false);
  };

  const filters = [
    "All",
    "Gaming",
    "Valorant",
    "TeluguMemes",
    "React",
    "Music",
    "Sports",
    "Movies",
    "Tech",
    "News",
    "play",
  ];
  const [pos, setPos] = useState(0);
  const divRef = useRef(null);
  const containerRef = useRef(null);
  const [listWidth, setListWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (divRef.current && containerRef.current) {
      setListWidth(divRef.current.scrollWidth);
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  const moveLeft = () => {
    setPos((prev) => Math.min(prev + 50, 0)); // Move right
  };
  const moveRight = () => {
    setPos((prev) => Math.max(prev - 50, containerWidth - listWidth)); // Move left but prevent overflow
  };

  return (
    <div className="w-full text-[2vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw] p-[2vw] flex flex-col lg:flex-row">
      {/* Video */}
      <div className="w-full lg:w-[70vw]">
        {/* video player */}
        <div className="w-full lg:w-[70vw] aspect-video   rounded-[1vw] overflow-hidden">
          <ReactPlayer
            url={videoData.videoUrl}
            width="100%"
            height="100%"
            controls
            playing={true} // Video autoplay
          />
        </div>
        {/* Video details */}
        <div className="w-full lg:w-[70vw] my-[1vw]">
          <h1 className="text-[1.2em] font-bold ">{videoData.title}</h1>
          {/* channel and likes */}
          <div className="flex justify-between items-center">
            {/* channel */}
            <div className="flex items-center">
              <h1>{videoData.author}</h1>
              <div className="mx-[1.5vw]">
                <button className=" bg-black px-[1vw] py-[0.3vw] text-white rounded-full cursor-pointer hover:bg-gray-800 ">
                  Subscribe
                </button>
              </div>
            </div>
            {/* like share donate and more */}
            <div className="flex items-center">
              {/* likes and dislikes */}
              <div className="flex items-center mr-[0.5em]">
                {/* likes */}
                <button className="flex items-center px-[1em] py-[0.3em] bg-gray-100 rounded-l-full border-r-[1px] border-gray-400 cursor-pointer hover:bg-gray-300 focus:bg-black focus:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-auto h-[1.2em] mr-[0.5em]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>
                  <h1 className="text-[0.8em]">
                    {formatLikes(videoData.likes)}
                  </h1>
                </button>
                {/* dislikes */}
                <button className="flex items-center px-[1em] py-[0.3em] rounded-r-full bg-gray-100 cursor-pointer hover:bg-gray-300 focus:bg-black focus:text-white">
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
                      d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                    />
                  </svg>
                </button>
              </div>
              {/* Share */}

              <button className="flex items-center px-[1em] py-[0.3em] rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 mr-[0.5em]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  focusable="false"
                  aria-hidden="true"
                  className="w-auto h-[1.2em] mr-[0.5em]"
                >
                  <path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path>
                </svg>
                <h1 className="text-[1em]">Share</h1>
              </button>

              {/* Download */}
              <button className="flex items-center px-[1em] py-[0.3em] rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 mr-[0.5em]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  focusable="false"
                  aria-hidden="true"
                  className="w-auto h-[1.2em] mr-[0.5em]"
                >
                  <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path>
                </svg>
                <h1 className="text-[1em]">Download</h1>
              </button>
              {/* Thanks */}
              <div className="hidden lg:block">
                <button className="flex items-center px-[1em] py-[0.3em] rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 mr-[0.5em]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em] mx-[0.5em]"
                  >
                    <path d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm5.5-15c-1.74 0-3.41.88-4.5 2.28C10.91 2.88 9.24 2 7.5 2 4.42 2 2 4.64 2 7.99c0 4.12 3.4 7.48 8.55 12.58L12 22l1.45-1.44C18.6 15.47 22 12.11 22 7.99 22 4.64 19.58 2 16.5 2zm-3.75 17.85-.75.74-.74-.73-.04-.04C6.27 14.92 3 11.69 3 7.99 3 5.19 4.98 3 7.5 3c1.4 0 2.79.71 3.71 1.89L12 5.9l.79-1.01C13.71 3.71 15.1 3 16.5 3 19.02 3 21 5.19 21 7.99c0 3.7-3.28 6.94-8.25 11.86z"></path>
                  </svg>
                  <h1 className="text-[1em]">Thanks</h1>
                </button>
              </div>
              {/* more */}
              <button className="flex items-center px-[1em] py-[0.3em] rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  focusable="false"
                  aria-hidden="true"
                  className="w-auto h-[1.2em]"
                >
                  <path d="M7.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm4.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Video description */}
        <div className="w-full lg:w-[70vw] bg-gray-100 p-[1em] rounded-[0.5vw] my-[1vw]">
          {/* views */}
          <div className="text-[0.8em] font-semibold">
            <h1>{formatLikes(videoData.likes)} Views</h1>
          </div>
          {/* description */}
          <div className="text-[0.8em] font-medium ">
            <h1>
              {showMore
                ? description
                : description.slice(0, max_length) +
                  (description.length > max_length ? "..." : "")}
            </h1>
            {description.length > max_length && (
              <button
                className="cursor-pointer hover:underline"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>
        {/* Comments section */}
        <div>
          {/* comments number */}
          <div className="text-[1.2em] font-bold">
            <h1>{videoData.comments.length} Comments</h1>
          </div>
          {/* comment input field */}
          <div className="w-full lg:w-[70vw]">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full outline-none border-b-[0.15vw] border-gray-200 focus:border-black"
              onChange={(e) => setCommentInput(e.target.value)}
              onClick={() => setIsCommentFocus(true)}
              value={commentInput}
            />
            {/* cancel and submit buttons */}
            <div
              className={`flex items-center justify-end py-[1em] ${
                isCommentFocus ? "block" : "hidden"
              } `}
            >
              {/* cancel */}
              <button
                className="px-[1em] py-[0.3em] cursor-pointer hover:bg-gray-200 rounded-full mr-[0.5em]"
                onClick={handleCommentCancel}
              >
                Cancel
              </button>
              {/* submit */}
              <button className="px-[1em] py-[0.3em] cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-full">
                Comment
              </button>
            </div>
          </div>
          {/* Comments */}
          <div>
            {videoData.comments.map((comment, index) => (
              <div key={index} className="pt-[1em] flex items-center justify-between">
                <div>
                  <h1 className="text-[0.8em]">@{comment.user.username}</h1>
                  <p>{comment.body}</p>
                </div>
                {/* edit and delete buttons */}
                <div className="flex items-center justify-end">
                  {/* edit */}
                  <button className="px-[1em] py-[0.5em] bg-gray-100 rounded-full mr-[0.5em] cursor-pointer hover:bg-gray-300">
                    Edit
                  </button>
                  {/* delete */}
                  <button className="px-[1em] py-[0.5em] bg-gray-100 rounded-full cursor-pointer hover:bg-gray-300">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* more videos */}
      <div className="w-full lg:w-[30vw]  pl-[1em]">
        <div className=" w-full h-full bg-white">
          {/* filter buttons */}
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
                    className="px-3 py-1 text-[2vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw] hover:cursor-pointer bg-gray-200 rounded-md mx-1.5 max-h-[2em] flex items-center flex-nowrap focus:bg-black focus:text-white"
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
          {/* Videos */}
          <div>
            {mockData.filter((data)=>(data.id!==videoData.id)).map((data,index)=>( 
              <MoreVideos videoData = {data} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;

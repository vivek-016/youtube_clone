import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { mockData } from "../utils/mockData.js";
import { useState, useRef, useEffect } from "react";
import MoreVideos from "./moreVideos.jsx";
import useFetchVideos from "../utils/useFetchVideos.js";
import useFetchVideo from "../utils/useFetchVideo.js";

function VideoPage() {


  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.userName);
  
  const{data,loading,error} = useFetchVideos("http://localhost:3000/api/videos");
  const{video,videoLoading,videoError} = useFetchVideo(`http://localhost:3000/api/videos/${params._id}`);

 
  const formatLikes = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };
  const [showMore, setShowMore] = useState(false);
  const max_length = 150;
  const [commentInput, setCommentInput] = useState("");
  const [isCommentFocus, setIsCommentFocus] = useState(false);
  const [comments,setComments] = useState([]);




  useEffect(()=>{
    if(video&&video.comments){
      setComments(video.comments);
      console.log("these are the comments:",comments);
    }
  },[video]);
  
  const [editIndex,setEditIndex] = useState(null);
  const [editedText,setEditedText] = useState("");

  const  handleEdit = (commentUser,index)=>{
    if(user._id != commentUser){
      console.error("You cannot edit this comment.");
      alert("You can not edit this comment.");
      return;
    }
    setEditIndex(index);
    setEditedText(comments[index].commentBody);
  }

  const handleCancelEdit = ()=>{
    setEditIndex(null);
  }

  const handleSaveEdit = async (index)=>{
    if(editedText.trim() == ""){
      alert("Comment cant be empty");
      return;
    }
    try{

      const token = localStorage.getItem("token");
      if(!token){
        console.error("No token found.User must be logged in");
        return;
      }

      const commentToEdit = comments[index];

      const response = await fetch("http://localhost:3000/api/comments/edit",{
        method:"PUT",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          comment_id: commentToEdit._id,
          commentBody: editedText
        })

      })

      const data = await response.json();

      if(!response.ok){
        throw new Error("failed to update comment");
      }

      const updatedComments = [...comments];
      updatedComments[index].commentBody = editedText;
      setComments(updatedComments);
      setEditIndex(null);

    }catch(error){
      console.error("error updating comment",error);
    }
  }

  const handleCommentCancel = () => {
    setCommentInput("");
    setIsCommentFocus(false);
  };
  const handleSubmitComment = async ()=>{

    const token = localStorage.getItem("token");
    if(!token){
      console.error("No token found.User must be logged in");
      return;
    }

    if(!commentInput.trim()){
      alert("Comment can not be empty");
      return;
    }
    try{
      const response = await fetch(`http://localhost:3000/api/videos/${params._id}/comments`,{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify({
          user:user._id,
          commentBody:commentInput
        })
      })
      

      const data = await response.json();

      if(!response.ok){
        throw new Error("Failed to add comment");
      }

      setComments((prevComments) => [...prevComments, data.comment])
      setCommentInput("");

    }catch(error){
      console.error("Error adding comment: ",error);
    }
  }


  const handleDeleteComment = async (comment_id,commentUser)=>{
    try{
      const token = localStorage.getItem("token");
      if(!token){
        console.error("No token found. User must be logged in");
        return;
      }

      if(user._id != commentUser){
        console.error("You cannot delete this comment.");
        alert("You can not delete this comment.");
        return;
      }

      const response = await fetch(`http://localhost:3000/api/videos/${video._id}/comments/${comment_id}`,{
        method:"DELETE",
        headers:{
          "Authorization": `Bearer ${token}`
        }
      });

      if(!response.ok){
        throw new Error("falied to delete comment");
      }

      setComments((prevComments)=>prevComments.filter((comment)=>comment._id!=comment_id));
      alert("Comment deleted successfully");
    }catch(error){
      console.error("Error deleting comment",error);
    }
  }

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

  if(videoLoading || loading){
    return(
      <div className="flex h-[94vh] w-screen items-center justify-center">
        <h1 className="text-[70px] font-bold">Loading</h1>
      </div>
      
    );
  }

  if(videoError || error){
    return(
      <div className="flex h-[94vh] w-screen items-center justify-center">
        <h1 className="text-[60px] font-bold"><span className="text-red-600">Error:</span>{error}</h1>
      </div>
      
    )
  }



  return (
    <div className="w-full text-[2vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw] p-[2vw] flex flex-col lg:flex-row">
      {/* Video */}
      <div className="w-full lg:w-[70vw]">
        {/* video player */}
        <div className="w-full lg:w-[70vw] aspect-video   rounded-[1vw] overflow-hidden">
          <ReactPlayer
            url={video.videoUrl}
            width="100%"
            height="100%"
            controls
            playing={true} // Video autoplay
          />
        </div>
        {/* Video details */}
        <div className="w-full lg:w-[70vw] my-[1vw]">
          <h1 className="text-[1.2em] font-bold ">{video.title}</h1>
          {/* channel and likes */}
          <div className="flex justify-between items-center">
            {/* channel */}
            <div className="flex items-center">
              <h1 className="flex flex-col justify-center items-center">
                <p className="font-bold">{video.channel.channelName}</p>
                {video.channel.subscribers} Subscribers
              </h1>
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
                  <h1 className="text-[0.8em]">{formatLikes(video.likes)}</h1>
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
            <h1>{formatLikes(video.likes)} Views</h1>
          </div>
          {/* description */}
          <div className="text-[0.8em] font-medium ">
            <h1>
              {showMore
                ? video.description
                : video.description.slice(0, max_length) +
                  (video.description.length > max_length ? "..." : "")}
            </h1>
            {video.description.length > max_length && (
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
            <h1>{comments.length} Comments</h1>
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
              <button
                onClick={handleSubmitComment}
                className="px-[1em] py-[0.3em] cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                Comment
              </button>
            </div>
          </div>
          {/* Comments */}
          <div>
            {comments.map((comment, index) => (
              <div
                key={index}
                className="pt-[1em] flex items-center justify-between"
              >
                <div>
                  <h1 className="text-[0.8em]">
                    @
                    {comment.user.userName
                      ? comment.user.userName
                      : user.userName}
                  </h1>
                  <p>{comment.commentBody}</p>
                </div>
                {/* edit and delete buttons */}
                <div className="flex items-center justify-end">
                  {/* edit */}
                  <button
                    onClick={() => handleEdit(comment.user._id, index)}
                    className="px-[1em] py-[0.5em] bg-gray-100 rounded-full mr-[0.5em] cursor-pointer hover:bg-gray-300"
                  >
                    Edit
                  </button>
                  {/* delete */}
                  <button
                    onClick={() =>
                      handleDeleteComment(comment._id, comment.user._id)
                    }
                    className="px-[1em] py-[0.5em] bg-gray-100 rounded-full cursor-pointer hover:bg-gray-300"
                  >
                    Delete
                  </button>
                </div>
                {/* edit container */}
                {editIndex == index && (
                  <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50 h-full w-full">
                    <div className=" mt-2 flex flex-col gap-2 bg-white opacity-100 rounded-[0.5vw] p-[1vw]">
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="edit-input px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                      />
                      <div className="flex gap-2">
                        <button
                          className="text-[2vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw] save-btn px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600"
                          onClick={() => handleSaveEdit(index)}
                        >
                          Save
                        </button>
                        <button
                          className="text-[2vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw] cancel-btn px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-400"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
            {data
              .filter((item) => item._id !== video._id)
              .map((videoData, index) => (
                <MoreVideos videoData={videoData} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;

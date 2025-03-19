import { Link, useNavigate } from "react-router-dom";
function ChannelVideoCard(props) {
  const navigate = useNavigate();
  const views = props.videoData.views;
  const formatViews = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };
  const handleDelete = (e)=>{
    
    e.stopPropagation();
    
    if(!window.confirm("Are you sure to delete this video")){
      return;
    }

    try{
      const response = fetch(`http://localhost:3000/api/channel/${props.videoData.channel._id}/videos/${props.videoData._id}`,{
        method:"DELETE"
      });

      if(!response.ok){
        throw new Error("failed to delete video");
      }

      alert("Video deleted Successfully");
      navigate("/Channel");


    }catch(error){
      console.error("error deleting video.", error);
    }
  }

  return (
    <Link to={`/${props.videoData._id}`}>
      <div className=" w-[40vw] h-[30vw] md:w-[28vw] md:h-[25vw] xl:w-[20vw] xl:h-[15vw]  m-[1vw] cursor-pointer ">
        {/* thumbnail */}
        <div className="w-full h-[75%] aspect-video overflow-hidden rounded-[0.8vw]">
          <img
            className="w-full h-full object-fill"
            src={props.videoData.thumbnailUrl}
            alt="thumbnail"
          />
        </div>
        {/* details */}
        <div className="text-[2vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw]">
          {/* Title */}
          <div className="font-medium ">
            
            <h1>{props.videoData.title}</h1>
          </div>

          {/* channel */}
          <div className="text-gray-600">
            <h1>{props.videoData.channel.channelName}</h1>
          </div>

          {/* views */}
          <div className="text-gray-600">
            <h1>{formatViews(views)} views</h1>
          </div>
        
          {/* Edit and Delete button */}
          <div className="flex">
            <Link to={`/video/${props.videoData._id}/edit`}>
                <button className="flex items-center px-[1em] py-[0.3em] rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 mr-[0.5em]">
                <h1 className="text-[1em]">Edit</h1>
                </button>
            </Link>
            

            <Link to={'/Channel'}>
            <button className="flex items-center px-[1em] py-[0.3em] rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 mr-[0.5em]" onClick={handleDelete} >
              <h1 className="text-[1em]">Delete</h1>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChannelVideoCard;
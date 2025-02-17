import { Link } from "react-router-dom";
function VideoCard(props) {
  const views = props.videoData.views;
  const formatViews = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <Link to = {`/${props.videoData.id}`}>
      <div className=" w-[40vw] h-[30vw] md:w-[28vw] md:h-[25vw] xl:w-[20vw] xl:h-[15vw]  my-[1vw] cursor-pointer ">
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
            <h1>{props.videoData.author}</h1>
          </div>
          {/* views */}
          <div className="text-gray-600">
            <h1>{formatViews(views)} views</h1>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;

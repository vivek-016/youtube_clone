import { Link } from "react-router-dom";
import { mockData } from "../utils/mockData";

function MoreVideos(props) {
  const formatViews = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  

  return (
    <Link to={`/${props.videoData._id}`}>
      <div className="py-[0.3em] flex cursor-pointer">
        {/* thumbnail container */}
        <div className="min-w-[25%] max-w-[25%] lg:min-w-[45%] lg:max-w-[45%] aspect-video bg-red-300 rounded-[0.5vw] overflow-hidden">
          <img
            className="w-full h-full object-fill"
            src={props.videoData.thumbnailUrl}
            alt="thumbnail"
          />
        </div>
        {/* video details */}
        <div className="px-[0.5em]">
          {/* Title */}
          <div>
            <h1>{props.videoData.title}</h1>
          </div>
          {/* channel */}
          <div className="text-[0.8em]">
            <p>{props.videoData.author}</p>
          </div>
          {/* Views */}
          <div className="text-[0.8em]">
            <p>{formatViews(props.videoData.views)} Views</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MoreVideos;

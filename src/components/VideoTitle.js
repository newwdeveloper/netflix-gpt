import { useState } from "react";
const VideoTitle = ({ title, overview }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInformation = () => {
    setShowInfo(!showInfo);
  };
  return (
    <div className="absolute bottom-1/4 left-8 z-20 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
        {title}
      </h1>
      {showInfo && (
        <p className="text-sm md:text-lg mb-6 w-3/4 md:w-1/2 drop-shadow-sm">
          {overview}
        </p>
      )}
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-red-600 text-white rounded-md text-sm md:text-lg hover:bg-red-700 transition">
          Play
        </button>
        <button
          className="px-6 py-2 bg-gray-700 text-white rounded-md text-sm md:text-lg hover:bg-gray-600 transition"
          onClick={toggleInformation}
        >
          More Information
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

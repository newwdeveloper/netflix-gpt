import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=FZbjj8yboajUEROa&autoplay=1&loop=1&mute=1&controls=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black z-10"></div>
    </div>
  );
};

export default VideoBackground;

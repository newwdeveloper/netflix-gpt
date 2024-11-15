import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (movies === null) return;
  const MainMovie = movies[0];

  const { original_title, overview, id } = MainMovie;
  /*Without Destructuring:const original_title = MainMovie.original_title;
    const overview = MainMovie.overview;                                                    
  Copy code*/

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;

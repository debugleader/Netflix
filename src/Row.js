import React, { useState, useEffect } from "react";
import axios from "./axios";
// import Youtube from "react-youtube";
// import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  // const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    // console.log(fetchUrl);
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // const opts = {
  //   height: "390",
  //   width: "100%",
  //   playerVars: {
  //     autoplay: 1,
  //   },
  // };

  const youtubeURL = "https://www.youtube.com/results?search_query=";

  // const handleWork = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movie?.name || "")
  //       .then((url) => {
  //         const urlParams = new URLSearchParams(new URL(url).search);
  //         setTrailerUrl(urlParams.get("v"));
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };

  return (
    <div>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {movies.map((movie) => {
            if (
              (isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)
            ) {
              return (
                <img
                  onClick={() => {
                    movie.name &&
                      window.open(youtubeURL + movie.name + " Trailer");
                  }}
                  // target="_blank"
                  key={movie.id}
                  // onclick={handleWork(movie)}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                ></img>
              );
            }
          })}
        </div>
      </div>
      {/* {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />} */}
    </div>
  );
}

export default Row;

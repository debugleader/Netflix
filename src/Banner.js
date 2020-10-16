import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

const youtubeURL = "https://www.youtube.com/results?search_query=";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          https://image.tmdb.org/t/p/original/${movie?.backdrop_path}
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button
            className="banner__button"
            onClick={() => {
              movie.name && window.open(youtubeURL + movie.name + " Trailer");
            }}
          >
            Trailer
          </button>
          <button
            className="banner__button"
            onClick={() => {
              window.open("https://github.com/debugleader");
            }}
          >
            Github
          </button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 180)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;

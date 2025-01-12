import React from "react";
import Img from "./Img";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import noposter from "../assets/no-poster.png";

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
  console.log(movie);
  return (
    <div
      onClick={() => navigate(`/detail/${movie.id}`)}
      key={movie.id}
      className="w-[170px] sm:w-[200px] md:w-[225px] pb-10  overflow-hidden transition-shadow duration-300"
    >
      <div className="relative  w-full aspect-[1/1.8] bg-cover bg-center  flex items-end justify-between ">
        <Img
          className={"rounded-2xl"}
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`: noposter}
        />
      </div>
      <div className="text-white flex flex-col -mt-14">
        <span className="text-base mb-[10px] leading-6">
          {movie.title || movie.name}
        </span>
        <span className="text-sm opacity-50">
          {dayjs(movie.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;

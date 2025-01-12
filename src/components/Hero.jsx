import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "./ContentWrapper";
import Img from "./Img";

const Hero = ({ bgImg, status }) => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div
      className="
      w-full h-[450px] bg-black flex items-center relative
      md:h-[700px]"
    >
      {status == "succeeded" && (
        <div className="w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden">
          <Img
            src={`https://image.tmdb.org/t/p/w500/${bgImg}`}
            className={"w-full h-full object-cover object-center"}
            alt=""
          />
        </div>
      )}
      <div className="w-full h-[250px] bg-gradient-to-t from-[#04152d] to-[#04152d 79.17%] absolute bottom-0 left-0"></div>
      <ContentWrapper>
        <div className="flex flex-col items-center text-white text-center relative max-w-[800px] mx-auto">
          <span className="text-4xl font-bold mb-3 md:mb-0 md:text-6xl">
            Welcome to the Movies World
          </span>
          <span className="text-sm font-medium mb-10 md:text-xl">
            Discover the latest movies, explore top-rated films, and stay up to
            date with what's trending in the world of cinema. Dive into the
            world of entertainment with ease!
          </span>
          <div className="flex items-center w-full">
            <input
              className="w-[calc(100%-100px)] h-12 text-blue-800 bg-white border-none outline-none rounded-l-[30px] px-4 text-sm
                  md:w-[calc(100%-150px)] md:h-16 md:text-2xl md:px-8"
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button
              onClick={() => {
                navigate(`/search/${query}`);
              }}
              className="w-24 h-12 font-bold bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 text-white outline-none border-none rounded-r-[30px]  text-base cursor-pointer
                  md:w-36 md:h-16 md:text-lg"
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Hero;

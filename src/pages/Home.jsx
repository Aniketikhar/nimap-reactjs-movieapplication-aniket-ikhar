import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { useSelector } from "react-redux";
import noposter from "../assets/no-poster.png";
import { Navigate, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";

const Home = () => {
  const { upcoming, popular, topRated, status, error } = useSelector(
    (state) => state.movies
  );
  

  if (status === "loading") return <p>Loading movies...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <div className="min-h-screen bg-[#04152d]">
      <Hero bgImg={upcoming[0]?.backdrop_path} status={status} />
      <div className="bg-[#04152d] pb-20">
        <div className=" container mx-auto">
          <div className="flex justify-between items-center my-5">
            <h2 className="text-2xl font-bold  text-white">Popular</h2>
            <div>
              <a href="/category/popular" className="text-blue-500">
                Browse All
              </a>
            </div>
          </div>
          <Slider movies={popular} />
        </div>
        <div className="bg-[#04152d] container mx-auto">
          <div className="flex justify-between items-center my-5">
            <h2 className="text-2xl font-bold  text-white">Upcoming</h2>
            <div>
              <a href="/category/upcoming" className="text-blue-500">
                Browse All
              </a>
            </div>
          </div>
          <Slider movies={upcoming} />
        </div>
        <div className=" container mx-auto">
          <div className="flex justify-between items-center my-5">
            <h2 className="text-2xl font-bold  text-white">Top Rated</h2>
            <div>
              <a href="/category/top_rated" className="text-blue-500">
                Browse All
              </a>
            </div>
          </div>
          <Slider movies={topRated} />
        </div>
      </div>
    </div>
  );
};

export default Home;

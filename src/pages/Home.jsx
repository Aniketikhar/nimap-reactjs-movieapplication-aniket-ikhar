import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/Slices/moviesSlice";

const Home = () => {
  const { upcoming, status, error } = useSelector((state) => state.movies);

  if (status === "loading") return <p>Loading movies...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <div className="min-h-screen">
      <Hero bgImg={upcoming[0]?.backdrop_path} status={status} />
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/moviesSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { upcoming, popular, topRated, status, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies("upcoming"));
    dispatch(fetchMovies("popular"));
    dispatch(fetchMovies("top_rated"));
  }, [dispatch]);

  if (status === "loading") return <p>Loading movies...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <div className="min-h-screen">
      <Hero bgImg={upcoming[0]?.backdrop_path} status={status} />
    </div>
  );
};

export default Home;

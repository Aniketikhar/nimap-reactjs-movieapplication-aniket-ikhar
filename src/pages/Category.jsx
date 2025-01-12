import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import noresult from "../assets/no-results.png";
import MovieCard from "../components/MovieCard";

const Category = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState();

  const { upcoming, popular, topRated, status, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    switch (category) {
      case "upcoming":
        setMovies(upcoming || []);
        break;
      case "popular":
        setMovies(popular || []);
        break;
      case "top_rated":
        setMovies(topRated || []);
        break;
      default:
        setMovies([]);
        break;
    }
  }, [category, upcoming, popular, topRated]);

  console.log(category);
  return (
    <>
      <div className="min-h-screen pt-28">
        <div className="container mx-auto">
          <div className="text-xl font-semibold text-gray-200 ml-2 md:ml-8 my-4">
            {category == "popular" ? "Popular" : category == "top_rated" ? "Top Rated" : category == "upcoming" ? "Upcoming" : ""}
          </div>
          <div className="flex flex-wrap gap-5 justify-center mb-5">
            {movies?.length > 0 ? (
              movies?.map((movie) => <MovieCard movie={movie} />)
            ) : (
              <div>
                <img src={noresult} width={400} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;

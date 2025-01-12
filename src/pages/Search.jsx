import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../store/Slices/searchSlice";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import noresult from "../assets/no-results.png";
import Loading from "../components/loading/Loading";

const Search = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { results, status, error } = useSelector((state) => state.search);

  useEffect(() => {
    if (query.trim()) {
      dispatch(searchMovies(query));
    }
  }, [query]);

  if (!results) {
    return (
      <div className='min-h-[300px] text-white md:mb-0 md:pt-[120px] md:min-h-[700px]'>
        <ContentWrapper><Loading /></ContentWrapper>
      </div>
    );
  }


  return (
    <div className="min-h-screen pt-28">
      <div className="container mx-auto">
        <div className="text-xl text-gray-200 ml-2 md:ml-8 my-4">
          Search Result for {query}
        </div>
        <div className="flex flex-wrap gap-5 justify-center mb-5">
          {results.length > 0 ? (
            results?.map((movie) => <MovieCard movie={movie} />)
          ) : (
            <div>
              <img src={noresult} width={400} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

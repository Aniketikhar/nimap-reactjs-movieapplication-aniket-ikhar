import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import noresult from "../assets/no-results.png";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../store/Slices/moviesSlice";
import ReactPaginate from "react-paginate";

const Category = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState();
  const dispatch = useDispatch();

  const fechedmovies = useSelector((state) => state.movies[category]);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const currentPage = useSelector((state) => state.movies.page[category]);
  const totalPages = useSelector((state) => state.movies.totalPages[category]);

  useEffect(() => {
    setMovies(fechedmovies || []);
  }, [category, fechedmovies]);

  const handlePageChange = (selectedPage) => {
    const selectedPageNumber = selectedPage.selected + 1; // react-paginate uses 0-based index
    dispatch(fetchMovies({ category, page: selectedPageNumber }));
  };
  return (
    <>
      <div className="min-h-screen pt-28">
        <div className="container mx-auto">
          <div className="text-xl font-semibold text-gray-200 ml-2 md:ml-8 my-4">
            {category == "popular"
              ? "Popular"
              : category == "top_rated"
              ? "Top Rated"
              : category == "upcoming"
              ? "Upcoming"
              : ""}
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
          <div className="flex justify-center p-4 ">
            {totalPages > 1 && (
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={totalPages}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                activeClassName={"active"}
                disabledClassName={"disabled"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;

import React from "react";
import { useNavigate } from "react-router-dom";

const Slider = ({ movies }) => {
  const navigate = useNavigate();
  return (
    <div className="scroll-invisible w-auto flex items-center gap-5 mx-auto">
            {movies?.slice(0, 12).map((movie) => (
              <div
                onClick={() => navigate(`/details/${movie.id}`)}
                className="cursor-pointer min-w-[200px] min-h-[360px]"
              >
                <div className="relative">
                  <img
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                        : noposter
                    }
                    className="w-[500px] rounded-xl"
                    alt=""
                  />
                </div>
                <div className="text-white font-semibold mt-2">
                  {movie.title}
                </div>
              </div>
            ))}
          </div>
  );
};

export default Slider;

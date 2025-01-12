import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDetails, fetchMovieDetails } from "../store/Slices/detailsSlice";
import Loading from "../components/loading/Loading";
import ContentWrapper from "../components/ContentWrapper";
import dayjs from "dayjs";
import Img from "../components/Img";
import noposter from "../assets/no-poster.png";
import Genres from "../components/Genres";
import { FaStar } from "react-icons/fa6";
import { clearCast, fetchMovieCast } from "../store/Slices/movieCastSlice";
import Cast from "../components/Cast";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { details, status, error } = useSelector((state) => state.movieDetails);
  const { cast } = useSelector((state) => state.movieCast);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    dispatch(fetchMovieCast(id));
    return () => {
      dispatch(clearDetails());
      dispatch(clearCast());
    };
  }, [dispatch, id]);

  console.log(details);

  if (status === "loading")
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  if (status === "failed") return <p className="text-red-500">{error}</p>;
  return (
    <div className="w-full bg-[#04152d] pt-[100px] mb-[50px] md:mb-0 md:pt-[120px] md:min-h-[700px]">
      {status !== "loading" ? (
        <>
          {!!details && (
            <>
              <div className="w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden">
                <Img
                  src={`https://image.tmdb.org/t/p/w500/${details?.backdrop_path}`}
                />
              </div>
              <div className="w-full h-[250px] absolute bottom-0 left-0"></div>
              <ContentWrapper className={""}>
                <div className="flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row ">
                  <div className="flex-shrink-0 h-full">
                    {details.poster_path ? (
                      <img
                        className={
                          "w-full block rounded-[12px] md:max-w-[350px]"
                        }
                        src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                      />
                    ) : (
                      <img
                        className={
                          "w-full block rounded-[12px] md:max-w-[350px]"
                        }
                        src={noposter}
                      />
                    )}
                  </div>
                  <div className="text-white">
                    <div className="text-[28px] leading-[40px] md:text-[34px] md:leading-[44px]">
                      {`${details.name || details.title} (${dayjs(
                        details.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="text-[16px] leading-[24px] mb-[15px] italic opacity-50 md:text-[20px] md:leading-[28px]">
                      {details.tagline}
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <FaStar className="text-yellow-400 text-3xl" />
                      </div>
                      <div>
                        <h3 className="font-bold m-0">
                          {details.vote_average.toFixed(1)}/10
                        </h3>
                        <small>{details.vote_count}</small>
                      </div>
                    </div>
                    <div className="rounded-[50px] max-w-[60px] md:max-w-[60px]  mt-5"></div>
                    <div className="mb-[15px]">
                      <div className="text-[24px] mb-[10px] mt-[20px]">
                        Overview
                      </div>
                      <div className="leading-6 md:pr-[100px]">
                        {details.overview}
                      </div>
                    </div>
                    <div className="mb-5">
                      <p>{details?.runtime} min runtime <br /> released on {details?.release_date}</p>
                    </div>
                    <div className="flex gap-3 mb-5">
                      {details?.genres.map((genre) => (
                        <div
                          key={genre.id}
                          className="rounded-full bg-pink-700 px-2 py-1"
                        >
                          {genre.name}
                        </div>
                      ))}
                    </div>
                    <div>
                      <span className="bg-green-500 p-2 font-bold rounded-xl">
                        {details.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 my-5">
                      {cast.length > 0 ? (
                        cast?.slice(0,5).map((actor) => (
                          <div
                            key={actor.id}
                            className="w-1/4 md:w-1/6 p-2 text-center"
                          >
                            <Cast actor={actor} />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">No cast available</p>
                      )}
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="flex relative flex-col gap-[25px] md:gap[50px] md:flex-row">
          <ContentWrapper className={"flex gap-[50px]"}>
            <div className="flex-shrink-0 w-full block rounded-[12px] aspect-[1/1.5] md:max-w-[350px] skeleton"></div>
            <div className="w-full ">
              <div className="w-full h-[25px] mb-[20px] rounded-[50px]"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px]"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px]"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px]"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px]"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px]"></div>
              <div className="w-full h-[25px] mb-[20px] rounded-[50px]"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default Details;

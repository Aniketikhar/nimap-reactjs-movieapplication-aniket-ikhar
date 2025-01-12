import React, { useState } from "react";

const Cast = ({ actor }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="relative flex justify-center items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cast Image */}
      <img
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        alt={actor.name}
        className="w-24 h-24 object-contain rounded-full  shadow-md"
      />

      {/* Popup for Additional Details */}
      {isHovered && (
        <div className="absolute bottom-28 -left-48 transform translate-x-1/2 w-64 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">{actor.name}</h3>
          <p className="text-sm text-gray-400">{actor.character}</p>
          <p className="text-sm mt-2">
            {actor.biography
              ? actor.biography.substring(0, 100) + "..."
              : "No biography available."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Cast;

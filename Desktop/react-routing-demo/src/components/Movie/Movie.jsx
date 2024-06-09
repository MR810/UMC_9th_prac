import React, { useState } from 'react';

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Movie = ({ title, poster_path, overview, vote_average, handleClick }) => {
    const [showOverview, setShowOverview] = useState(false);

    return (
        <div
            className="movie-container"
            onMouseEnter={() => setShowOverview(true)}
            onMouseLeave={() => setShowOverview(false)}
            onClick={handleClick}
        >
            <img src={`${IMG_BASE_URL}${poster_path}`} alt={`${title} 포스터`} />
            <div className="movie-info">
                <h4>{title}</h4>
                <span>{vote_average}</span>
            </div>
            {showOverview && (
                <div className="overview">
                    <h4>{title}</h4>
                    <p>{overview}</p>
                </div>
            )}
        </div>
    );
};

export default Movie;

import React from 'react';
import { topRatedDummy } from '../topRatedDummy';
import Movie from './Movie/Movie';
import { Link } from 'react-router-dom';

const TopRatedPage = () => {
    return (
        <div className='app-container'>
            {topRatedDummy.results.map(movie => (
                <Link to={`/toprated/${movie.id}`} key={movie.id}>
                    <Movie
                        title={movie.title}
                        poster_path={movie.poster_path}
                        vote_average={movie.vote_average}
                        overview={movie.overview}
                    />
                </Link>
            ))}
        </div>
    );
};

export default TopRatedPage;

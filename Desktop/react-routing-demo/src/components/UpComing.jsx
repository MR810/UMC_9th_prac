import React from 'react';
import { UpComingDummy } from '../UpComingDummy';
import Movie from './Movie/Movie';
import { Link } from 'react-router-dom';

const UpComing = () => {
    return (
        <div className='app-container'>
            {UpComingDummy.results.map(movie => (
                <Link to={`/upcoming/${movie.id}`} key={movie.id}>
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

export default UpComing;

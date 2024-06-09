import React from 'react';
import { topRatedDummy } from '../topRatedDummy';
import MovieDetail from './Movie/MovieDetail';
import { useParams } from 'react-router-dom';

const TopRatedDetail = () => {
    const { id } = useParams();
    const selectedMovie = topRatedDummy.results.find(movie => movie.id.toString() === id);

    return (
        <div className='movie-detail-container'>
            <MovieDetail
                title={selectedMovie.title}
                poster_path={selectedMovie.poster_path}
                vote_average={selectedMovie.vote_average}
                release_date={selectedMovie.release_date}
                overview={selectedMovie.overview}
            />
        </div>
    );
};

export default TopRatedDetail;

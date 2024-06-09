import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Movie from './Movie/Movie';

const API_KEY = "c3582d12294b042387849823b312b1ba";
const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";
const LANGUAGE = "ko";

const fetchMovies = async ({ pageParam = 1 }) => {
    const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}&language=${LANGUAGE}&page=${pageParam}`);
    return response.data;
};

const NowPlayingPage = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['movies'],
        queryFn: fetchMovies,
        getNextPageParam: (lastPage) => {
            const { page, total_pages } = lastPage;
            return page < total_pages ? page + 1 : undefined;
        },
    });

    const movies = data ? data.pages.flatMap(page => page.results) : [];

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className='app-container'>
            {movies.map((movie) => (
                <Link to={`/nowplaying/${movie.id}`} key={movie.id}>
                    <Movie
                        title={movie.title}
                        poster_path={movie.poster_path}
                        vote_average={movie.vote_average}
                        overview={movie.overview}
                    />
                </Link>
            ))}
            {isFetchingNextPage && <div>Loading...</div>}
        </div>
    );
};

export default NowPlayingPage;

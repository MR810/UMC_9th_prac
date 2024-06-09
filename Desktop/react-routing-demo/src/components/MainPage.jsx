import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Movie from './Movie/Movie';
const API_key = "api_key=c3582d12294b042387849823b312b1ba";
const base_url = "https://api.themoviedb.org/3/";

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
export default function MainPage({ isLoggedIn, username }) {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchMovies = async (query) => {
        if (query.trim() === '') {
            setMovies([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`${base_url}search/movie?query=${query}&${API_key}&language=ko`);
            setMovies(response.data.results);
        } catch (error) {
            console.error("영화 검색 중 오류 발생:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debouncedFetchMovies = debounce((query) => {
            fetchMovies(query);
        }, 500);
        
        debouncedFetchMovies(search);
        
        return () => {
            debouncedFetchMovies.cancel && debouncedFetchMovies.cancel();
        };
    }, [search]);

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div>
            <div className="mainPage-body">
                {isLoggedIn ? `${username}님 환영합니다` : '환영합니다'}
            </div>
            <div className="mainPage-inputSection">
                <span>📽️ Find Your Movie !</span>
                <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </div>
                {search.trim() !== '' && (
                    <div className="movies-container">
                        {loading ? (
                            <div>데이터를 받아오는 중입니다..</div>
                        ) : (
                            movies.length > 0 ? (
                                movies.map(movie => (
                                    <Movie
                                        key={movie.id}
                                        title={movie.title}
                                        poster_path={movie.poster_path}
                                        overview={movie.overview}
                                        vote_average={movie.vote_average}
                                        handleClick={() => handleMovieClick(movie.id)}
                                    />
                                ))
                            ) : (
                                <div>영화를 찾을 수 없습니다</div>
                            )
                        )}
                    </div>
                )}
        </div>
    );
}

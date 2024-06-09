import React, { useState, useEffect } from 'react';
import Movie from './Movie/Movie';
import { Link } from 'react-router-dom';

const API_KEY = 'c3582d12294b042387849823b312b1ba'; // 여기에 자신의 TMDB API 키를 입력하세요.
const BASE_URL = 'https://api.themoviedb.org/3';

const PopularPage = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const country = 'US'; // 국가 정보를 여기에 설정합니다.

    useEffect(() => {
        const fetchPopularMovies = async (page = 1, country = 'US') => {
            try {
                const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=${page}&region=${country}`);

                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Popular movies fetch error:', error);
                return null;
            }
        };

        const loadMovies = async () => {
            const data = await fetchPopularMovies(currentPage, country);
            if (data) {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            }
        };

        loadMovies();
    }, [currentPage, country]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className='app-container'>
            {movies && movies.map(movie => ( // movies가 존재하는지 확인하여 map 함수를 호출
                <Link to={`/popular/${movie.id}`} key={movie.id}>
                    <Movie
                        title={movie.title}
                        poster_path={movie.poster_path}
                        vote_average={movie.vote_average}
                        overview={movie.overview}
                    />
                </Link>
            ))}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default PopularPage
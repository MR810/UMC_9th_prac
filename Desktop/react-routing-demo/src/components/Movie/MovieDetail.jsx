import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_key = "api_key=c3582d12294b042387849823b312b1ba";
const base_url = "https://api.themoviedb.org/3/";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PROFILE_IMG_BASE_URL = "https://image.tmdb.org/t/p/w185";
const DEFAULT_PROFILE_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s"; // 기본 프로필 이미지 URL

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`${base_url}movie/${id}?${API_key}&language=ko`);
                setMovie(response.data);
            } catch (error) {
                console.error("영화 상세 정보 가져오기 중 오류 발생:", error);
            }
        };

        const fetchCredits = async () => {
            try {
                const response = await axios.get(`${base_url}movie/${id}/credits?${API_key}&language=ko`);
                setCredits(response.data);
            } catch (error) {
                console.error("영화 출연진 정보 가져오기 중 오류 발생:", error);
            }
        };

        fetchMovie();
        fetchCredits();
    }, [id]);

    if (!movie || !credits) return <div>Loading...</div>;

    const ratingStars = '⭐️'.repeat(Math.floor(movie.vote_average)) + (movie.vote_average % 1 >= 0.5 ? '⭐️' : '');

    return (
        <div className="movie-detail-container" style={{ backgroundImage: `url(${IMG_BASE_URL + movie.poster_path})` }}>
            <div className="movie-detail-overlay"></div>
            <div className="poster-container">
                <img src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="movie-detail-content">
                <h4>{movie.title}</h4>
                <p>평점 {ratingStars}</p>
                <p>개봉일 {movie.release_date}</p>
                <p>줄거리</p>
                <p>{movie.overview || "TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다."}</p>
                <div className="credits">
                    <h4>출연진 및 제작진</h4>
                    <ul className="cast-list">
                        {credits.cast.slice(0, 5).map((actor) => (
                            <li key={actor.cast_id} className="cast-item">
                                <img 
                                    src={actor.profile_path ? `${PROFILE_IMG_BASE_URL}${actor.profile_path}` : DEFAULT_PROFILE_IMG} 
                                    alt={actor.name} 
                                    className="profile-img" 
                                />
                                <div className="cast-info">
                                    <strong>{actor.name}</strong>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul className="crew-list">
                        {credits.crew.slice(0, 5).map((crew) => (
                            <li key={crew.credit_id} className="crew-item">
                                <img 
                                    src={crew.profile_path ? `${PROFILE_IMG_BASE_URL}${crew.profile_path}` : DEFAULT_PROFILE_IMG} 
                                    alt={crew.name} 
                                    className="profile-img" 
                                />
                                <div className="crew-info">
                                    <strong>{crew.name}</strong>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;

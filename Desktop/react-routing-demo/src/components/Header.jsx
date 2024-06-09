import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="header-container">
            <div className="header-wrap">
                  <Link to="/" className="logo-link">
                      <img
                          className="logo-image"
                           alt="UMC Movie"
                      />
                  </Link>
                    <ul className="nav-list">
                      {isLoggedIn ? (
                        <button className="log-button" onClick={handleLogout}>로그아웃</button>) : ( <>
                          <Link className="nav-link" to="/loginPage">로그인</Link>
                          <Link className="nav-link" to="/validation">회원가입</Link></>)}
                            <Link className='nav-link' to="/PopularPage">Popular</Link>
                            <Link className='nav-link' to="/NowPlayingPage">Now Playing</Link>
                            <Link className='nav-link' to="/TopRatedPage">Top Rated</Link>
                            <Link className='nav-link' to="/UpComing">Upcoming</Link>
                    </ul>
            </div>
        </div>
    );
}

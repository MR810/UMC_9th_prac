import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';
import NowPlayingPage from './components/NowPlayingPage';
import PopularPage from './components/PopularPage';
import TopRatedPage from './components/TopRatedPage';
import Upcoming from './components/UpComing';
import NotFound from './components/NotFound';
import MovieDetail from './components/Movie/MovieDetail';
import PopularDetail from './components/PopularDetail';
import NowPlayDetail from './components/NowPlayDetail';
import TopRatedDetail from './components/TopRatedDetail';
import UpComingDetail from './components/UpComingDetail';
import Validation from './components/Validation';
import LoginPage from './components/LoginPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [username, setUsername] = useState('');

    return (
        <div className="root-wrap">
            <BrowserRouter>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isSignedUp={isSignedUp} />
                <Routes>
                    <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} username={username} />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/NowPlayingPage" element={<NowPlayingPage />} />
                    <Route path="/PopularPage" element={<PopularPage />} />
                    <Route path="/TopRatedPage" element={<TopRatedPage />} />
                    <Route path="/UpComing" element={<Upcoming />} />
                    <Route path="/popular/:id" element={<PopularDetail />} />
                    <Route path="/nowplaying/:id" element={<NowPlayDetail />} />
                    <Route path="/toprated/:id" element={<TopRatedDetail />} />
                    <Route path="/upcoming/:id" element={<UpComingDetail />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route path="/validation" element={<Validation setIsSignedUp={setIsSignedUp} />} />
                    <Route path="/loginPage" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

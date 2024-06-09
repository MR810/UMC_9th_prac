import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setIsLoggedIn, setUsername }) {
    const [username, setUsernameLocal] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateInputs = () => {
        let newErrors = {};
        
        if (!username.trim()) {
            newErrors.username = '아이디를 입력해 주세요';
        } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
            newErrors.username = '아이디는 문자열만 입력 가능합니다';
        }

        if (!password) {
            newErrors.password = '비밀번호를 입력해 주세요';
        } else if (password.length < 8) {
            newErrors.password = '비밀번호는 8자 이상이어야 합니다';
        } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            newErrors.password = '비밀번호는 최소 하나의 대문자와 숫자를 포함해야 합니다';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = () => {
        if (validateInputs()) {
            setIsLoggedIn(true);
            setUsername(username);
            navigate('/');
        }
    };

    return (
        <div className="pageAll">
            <div className="page">
                <div className="titleWrap">
                    로그인 페이지
                </div>
                <div className="contentWrap">
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder='아이디를 입력해주세요'
                            value={username}
                            onChange={(e) => setUsernameLocal(e.target.value)}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {errors.username && <div className="error">{errors.username}</div>}
                    </div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder='비밀번호를 입력해주세요'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                </div>

                <div>
                    <button
                        className='bottomButton'
                        onClick={handleLogin}
                    >
                        로그인
                    </button>
                </div>
            </div>
        </div>
    );
}

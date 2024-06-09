import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Validation({ setIsSignedUp }) {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameValid, setNameValid] = useState(false);
    const [idValid, setIdValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [ageValid, setAgeValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [conPwValid, setConPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [pwError, setPwError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (nameValid && idValid && emailValid && ageValid && pwValid && conPwValid) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [nameValid, idValid, emailValid, ageValid, pwValid, conPwValid]);

    const displayMessage = (field, message, type) => {
        const newErrorMessage = `[${type.toUpperCase()}] ${field}: ${message}`;
        setPwError(newErrorMessage);
    };

    const handleName = (e) => {
        const nameValue = e.target.value;
        if (typeof nameValue === 'string') {
            setName(nameValue);
            setNameValid(true);
        } else {
            displayMessage('name', '이름은 문자열이어야 합니다!', 'error');
            setNameValid(false);
        }
    };

    const handleId = (e) => {
        const idValue = e.target.value;
        if (typeof idValue === 'string') {
            setId(idValue);
            setIdValid(true);
        } else {
            displayMessage('id', '아이디는 문자열이어야 합니다!', 'error');
            setIdValid(false);
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };

    const handleAge = (e) => {
        const ageValue = e.target.value;
        if (isNaN(ageValue)) {
            displayMessage('age', '나이는 숫자 형식이어야 합니다!', 'error');
            setAgeValid(false);
        } else if (ageValue < 0) {
            displayMessage('age', '나이는 음수가 될 수 없습니다!', 'error');
            setAgeValid(false);
        } else if (!Number.isInteger(parseFloat(ageValue))) {
            displayMessage('age', '나이는 소수가 될 수 없습니다!', 'error');
            setAgeValid(false);
        } else if (ageValue < 19) {
            displayMessage('age', '미성년자는 가입할 수 없습니다!', 'error');
            setAgeValid(false);
        } else {
            setAge(ageValue);
            setAgeValid(true);
        }
    };

    const handlePw = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        setConfirmPassword(''); // Clear confirmPassword when password changes
        const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&()\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&()\-_=+]).{4,12}$/;
        if (!passwordValue) {
            displayMessage('password', '비밀번호는 문자열이어야 합니다!', 'error');
            setPwValid(false);
        } else if (passwordValue.length < 4) {
            displayMessage('password', '비밀번호는 최소 4자리 이상이어야 합니다.', 'error');
            setPwValid(false);
        } else if (passwordValue.length > 12) {
            displayMessage('password', '비밀번호는 최대 12자리까지 가능합니다.', 'error');
            setPwValid(false);
        } else if (!regex.test(passwordValue)) {
            displayMessage('password', '비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.', 'error');
            setPwValid(false);
        } else {
            setPwValid(true);
        }
    };

    const handleConPw = (e) => {
        const confirmPasswordValue = e.target.value;
        if (typeof confirmPasswordValue !== 'string') {
            displayMessage('confirm-password', '비밀번호 확인은 문자열이어야 합니다.', 'error');
            setConPwValid(false);
        } else if (password !== confirmPasswordValue) {
            displayMessage('confirm-password', '비밀번호가 일치하지 않습니다.', 'error');
            setConPwValid(false);
        } else {
            setConfirmPassword(confirmPasswordValue);
            setConPwValid(true);
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any additional logic or API calls for signup
        axios
          .post('http://localhost:8080/auth/signup', {
            name: name,
            email: email,
            age: age,
            username: id,
            password: password,
            passwordCheck: confirmPassword,
          })
          .then((response) => {
            console.log('201', response.data);
            if (response.status === 201) {
              alert('회원가입이 정상적으로 처리 되었습니다');
              localStorage.setItem(response.data.token, response.data.username);
              navigate('/LoginPage')
            }
          })
          .catch((error) => console.log(error.response));
    };

    return (
        <div className="pageAll">
            <div className="page">
                <div className="titleWrap">
                    회원가입 페이지
                </div>
            <form id="login" action="LoginPage.jsx">
                <div className="contentWrap">
                    <div className="inputTitle"></div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder='이름을 입력해주세요'
                            value={name}
                            onChange={handleName}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {nameValid ? '' : '이름을 입력해주세요!'}
                    </div>

                    <div className="inputTitle"></div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder='아이디를 입력해주세요'
                            value={id}
                            onChange={handleId}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {idValid ? '' : '아이디를 입력해주세요!'}
                    </div>

                    <div className="inputTitle"></div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder='이메일을 입력해주세요'
                            value={email}
                            onChange={handleEmail}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {emailValid ? '' : '이메일을 입력해주세요!'}
                    </div>

                    <div className="inputTitle"></div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder='나이를 입력해주세요'
                            value={age}
                            onChange={handleAge}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {ageValid ? '' : '나이는 숫자로 입력해주세요!'}
                    </div>

                    <div style={{ marginTop: "26px" }} className="inputTitle"></div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder='비밀번호를 입력해주세요'
                            type="password"
                            value={password}
                            onChange={handlePw}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {pwValid ? '' : pwError}
                    </div>

                    <div className="inputTitle"></div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder='비밀번호를 다시 입력해주세요'
                            type="password"
                            value={confirmPassword}
                            onChange={handleConPw}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {conPwValid ? '' : '비밀번호가 일치하지 않습니다.'}
                    </div>
                </div>

                <div>
                    <button disabled={notAllow} className='bottomButton' onClick={handleSubmit}>
                        제출하기
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <div className="login-go">이미 아이디가 있으신가요?  👉👉 </div>
                        <Link className="" to="/loginPage" style={{ color: "white", marginLeft: '5px' }}>
                            로그인 페이지로 이동하기
                        </Link>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
}


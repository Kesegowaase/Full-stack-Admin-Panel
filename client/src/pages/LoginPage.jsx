import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncUser, getLogin } from '../app/features/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const clickHandler = () => {
        setButtonDisabled(true);
        dispatch(fetchAsyncUser({ username, password }));
        setButtonDisabled(false);
        setPassword("");
        setUsername("");
        navigate('/titles');
    }

    const usernameHandler = (e) => {
        setUsername(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className='container mt-3'>
            <div className='row justify-content-center align-items-center'>
                <div className='m-1 col-sm-8 col-md-6 col-lg-6 shadow-sm p-3 mb-5 bg-white border rounded '>
                    <h1 className='text-center my-4 font-weight-bold-display-4'>Sign in</h1>
                    <div className='mb-2 '>
                        <label >Username</label>
                        <input
                            className={`form-control shadow-none}`}
                            autoComplete='off'
                            onChange={usernameHandler}
                        />
                        <label >Password</label>
                        <input
                            type='password'
                            className={`form-control shadow-none}`}
                            autoComplete='off'
                            onChange={passwordHandler}
                        />
                    </div >
                    <button disabled={buttonDisabled} onClick={clickHandler} className='btn btn-secondary mt-3 col-md-3' type='submit'>Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../../redux/api/authApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import MetaData from '../layout/MetaData';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // ✅ FIX: Removed unused 'data' from the destructuring.
    const [login, { isLoading, error }] = useLoginMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (error) {
            toast.error(error?.data?.message);
        }
    }, [isAuthenticated, error, navigate]); // ✅ FIX: Added 'navigate' to dependency array

    const submitHandler = (e) => {
        e.preventDefault();
        const loginData = { email, password };
        login(loginData);
    };

    return (
        <>
            {/* ✅ FIX: Used the imported MetaData component */}
            <MetaData title={'Login'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Login</h1>
                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <a href="/password/forgot" className="float-end mb-4">Forgot Password?</a>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn w-100 py-2"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Authenticating...' : 'LOGIN'}
                        </button>

                        <div className="my-3">
                            <a href="/register" className="float-end">New User?</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;

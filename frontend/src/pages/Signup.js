import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        First_name: '', // Changed to match the server's expected format
        Last_name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    console.log('signupInfo -> ', signupInfo);

    const handleSignup = async (e) => {
        e.preventDefault();
        const { First_name, Last_name, email, password } = signupInfo;
        if (!First_name || !Last_name || !email || !password) {
            return handleError('First name, last name, email, and password are required');
        }
        try {
            const url = `https://mern-login-kk-api.vercel.app/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err.message || 'Something went wrong');
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='First_name'>First Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='First_name' // Changed to match the server's expected format
                        autoFocus
                        placeholder='Enter your first name...'
                        value={signupInfo.First_name}
                    />
                </div>
                <div>
                    <label htmlFor='Last_name'>Last Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='Last_name' // Changed to match the server's expected format
                        placeholder='Enter your last name...'
                        value={signupInfo.Last_name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;

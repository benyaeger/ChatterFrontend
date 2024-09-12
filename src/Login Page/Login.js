import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LoginPage, { Username, Password, Submit, Reset, Footer, Block, Input, Title } from '@react-login-page/base';
import './Login.css';

function Login() {
    const navigate = useNavigate(); // Initialize useNavigate

    const [pageMode, setPageMode] = useState('signin');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [error, setError] = useState(''); // State for error message

    function resetFields() {
        setPassword('');
        setUsername('');
        setFirstName('');
        setLastName('');
        setError(''); // Clear error message on reset
    }

    function redirectAfterAuth() {
        navigate('/chats');
    }

    function handleLogin() {
        if (!username || !password) {
            setError('Please fill all fields.'); // Set error message if any field is empty
        } else {
            setError('');
            // TODO Finish Login Logic (Authenticate user with server)
            console.log('Login:', { username, password });
            redirectAfterAuth();
        }
    }

    function handleSignup() {
        if (!username || !password || !firstname || !lastname) {
            setError('Please fill all fields.'); // Set error message if any field is empty
        } else {
            setError('');
            // TODO Finish Signup Logic (Authenticate user with server)
            console.log('Signup:', { username, password, firstname, lastname });
            redirectAfterAuth();
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-white to-white">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                {pageMode === 'signin' && (
                    <LoginPage className='bg-white'>
                        {error && <div className="error-message">{error}</div>} {/* Show error message */}
                        <Username
                            className="w-full mb-4"
                            placeholder="Username"
                            name="userUserName"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Updates the username state
                        />
                        <Password
                            className="w-full mb-4"
                            placeholder="Password"
                            name="userPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Updates the password state
                        />
                        <Submit className="w-full mb-4 bg-blue-500 text-white hover:bg-blue-600" onClick={handleLogin}>Login</Submit>
                        <Reset className="w-full mb-4 bg-gray-300 text-black hover:bg-gray-400" onClick={resetFields}>Reset</Reset>
                        <Title className="text-black">Chatter</Title>
                        <Footer className="text-center">
                            <span className="text-gray-600">Not a member?</span>
                            <button className="footer-button mt-2 text-blue-500 hover:text-blue-700" onClick={() => setPageMode('signup')}>Sign Up now!</button>
                        </Footer>
                    </LoginPage>
                )}
                {pageMode === 'signup' && (
                    <LoginPage className='bg-white'>
                        {error && <div className="error-message">{error}</div>} {/* Show error message */}
                        <Input
                            name='firstname'
                            className='w-full mb-4'
                            placeholder='First Name'
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)} />
                        <Input
                            name='lastname'
                            className='w-full mb-4'
                            placeholder='Last Name'
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)} />
                        <Username
                            className="w-full mb-4"
                            placeholder="Username"
                            name="userUserName"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Updates the username state
                        />
                        <Password
                            className="w-full mb-4"
                            placeholder="Password"
                            name="userPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Updates the password state
                        />
                        <Submit className="w-full mb-4 bg-blue-500 text-white hover:bg-blue-600" onClick={handleSignup}>Sign Up</Submit>
                        <Reset className="w-full mb-4 bg-gray-300 text-black hover:bg-gray-400" onClick={resetFields}>Reset</Reset>
                        <Title className="text-black">Chatter</Title>
                        <Footer className="text-center">
                            <span className="text-gray-600">Already a member?</span>
                            <button className="footer-button mt-2 text-blue-500 hover:text-blue-700" onClick={() => setPageMode('signin')}>Sign in now</button>
                        </Footer>
                    </LoginPage>
                )}
            </div>
        </div>
    );
}

export default Login;

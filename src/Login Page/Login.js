import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, confirmSignUp, signIn } from 'aws-amplify/auth';
import './Login.css'; // You can use this file for additional custom styles if needed

function Login() {
    const navigate = useNavigate();

    const [pageMode, setPageMode] = useState('signin');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    // Auth Management
    const [confirmSignUpField, setConfirmSignUpField] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');

    const [error, setError] = useState('');

    function resetFields() {
        setPassword('');
        setUsername('');
        setFirstName('');
        setLastName('');
        setEmailAddress('');
        setConfirmationCode('');
        setError('');
    }

    function redirectAfterAuth() {
        navigate('/chats');
    }

    async function handleLogin() {
        if (!username || !password) {
            setError('Please fill all fields.');
        }
        else {
            try {
                console.log("start signing in")
                const { isSignedIn, nextStep, user } = await signIn({
                    username: username,
                    password: password
                });
                console.log(`responses: ${isSignedIn, nextStep, user}`);
                if (isSignedIn) {
                    redirectAfterAuth();
                }
            } catch (error) {
                console.log(`error: ${error}`);
                setError(JSON.stringify(error));
            }
        }
    }

    async function handleSignup() {
        if (!username || !password || !firstname || !lastname || !emailAddress) {
            setError('Please fill all fields.');
        } else {
            try {
                const { user, nextStep, isSignUpComplete } = await signUp({
                    username,
                    password,
                    options: {
                        userAttributes: {
                            email: emailAddress,
                            given_name: firstname,
                            family_name: lastname
                        },
                        autoSignIn: true
                    }
                });
                if ((nextStep && nextStep.step === 'CONFIRM_SIGN_UP') || !isSignUpComplete) {
                    console.log('confirmation needed, showing relevant field')
                    setConfirmSignUpField(true);
                } else if (nextStep && nextStep.step === 'DONE') {
                    redirectAfterAuth();
                }
            } catch (error) {
                setError(JSON.stringify(error));
            }
        }
    }

    async function handleSignupConfirmation() {
        try {
            await confirmSignUp(username, confirmationCode);
            redirectAfterAuth();
        } catch (error) {
            setError(JSON.stringify(error));
        }

        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username: username,
                confirmationCode: confirmationCode
            });
            if (isSignUpComplete) {
                redirectAfterAuth();
            }
            else {
                throw error('sign up not completed')
            }
        } catch (error) {
            setError(JSON.stringify(error));
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-white to-white">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                {pageMode === 'signin' && (
                    <div className="space-y-6">

                        <h1 className="text-2xl font-bold mb-4">Chatter</h1>
                        <div>
                            <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Password"
                            />
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={resetFields}
                            className="w-full bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                        >
                            Reset
                        </button>
                        <div className="text-center mt-4">
                            <span className="text-gray-600">Not a member? </span>
                            <button
                                onClick={() => setPageMode('signup')}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Sign Up now!
                            </button>
                        </div>
                    </div>
                )}
                {pageMode === 'signup' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                id="firstname"
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                id="lastname"
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Last Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" htmlFor="emailAddress">Email Address</label>
                            <input
                                type="email"
                                id="emailAddress"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Email Address"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Password"
                            />
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <button
                            onClick={handleSignup}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={resetFields}
                            className="w-full bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                        >
                            Reset
                        </button>
                        <div className="text-center mt-4">
                            <span className="text-gray-600">Already a member? </span>
                            <button
                                onClick={() => setPageMode('signin')}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Sign in now
                            </button>
                        </div>
                        {confirmSignUpField && (
                            <div>
                                <label className="block text-sm font-medium mb-2" htmlFor="confirmationCode">Confirmation Code</label>
                                <input
                                    type="text"
                                    id="confirmationCode"
                                    value={confirmationCode}
                                    onChange={(e) => setConfirmationCode(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Confirmation Code"
                                />
                                <button
                                    onClick={handleSignupConfirmation}
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
                                >
                                    Confirm
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;

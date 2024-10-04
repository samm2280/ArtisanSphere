import React, { useState } from 'react';
import { auth } from './firebase';  //Service Login Page
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../../images/EZG0WFoXsAEx-dp.jpg';


const ClientLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [resetMessage, setResetMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password
      await auth.signInWithEmailAndPassword(email, password);
      // Redirect to Artisan page after successful login
      navigate('/client');
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email to reset password');
      return;
    }
    try {
      await auth.sendPasswordResetEmail(email);
      setResetMessage('Password reset email sent successfully');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen justify-end items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <form onSubmit={handleLogin} className="w-full max-w-md p-6 rounded-lg bg-white mt-[40px] mr-[50px] bg-opacity-90 shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        {resetMessage && <p className="text-green-500 text-xs italic">{resetMessage}</p>}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 text-sm focus:outline-none focus:underline"
            onClick={handlePasswordReset}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientLogin;

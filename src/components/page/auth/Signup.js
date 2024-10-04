import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import backgroundImage from '../../images/artisan-amid-sculptures-stockcake.jpg'; // Import your background image

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAOD71J0RWnNiPM9ly9GxqeUdzKfLfgYTA",
  authDomain: "artisans-774fd.firebaseapp.com",
  projectId: "artisans-774fd",
  storageBucket: "artisans-774fd.appspot.com",
  messagingSenderId: "93179578940",
  appId: "1:93179578940:web:b8cbf8431c9cd6ba241139",
  measurementId: "G-T6LZ472YEY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [job, setJob] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [otherJobs, setOtherJobs] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    if (job === '' && otherJobs.trim() === '') {
      setError('Sign up failed: Please select a job from the dropdown or provide details in the "Other jobs" field.');
      return;
    }

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await user.updateProfile({
        displayName: displayName,
      });

      await firebase.firestore().collection('users').doc(user.uid).set({
        email: email,
        displayName: displayName,
        age: age,
        job: job,
        country: country,
        name: name,
        password: password,
        description: description,
        number: number,
        otherJobs: job === 'Others' ? otherJobs : '',
      });

      console.log('User signed up successfully:', user);
      navigate('/login');
    } catch (error) {
      setError('Sign up failed: ' + error.message);
    }
  };

  return (
    <div
      className="flex justify-end items-center h-screen"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full max-w-md p-6 rounded-lg bg-white mt-[40px] mr-[50px] bg-opacity-90 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="space-y-2 mb-3">
          <input
            type="text"
            placeholder="Username"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
          />
          <input
            type="text"
            placeholder="Number (eg. 0541432280)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
          />
          <select
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
          >
            <option value="" disabled>Select Job</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Plumber">Plumber</option>
            <option value="Mason">Mason</option>
            <option value="Others">Others</option>
          </select>
          {job === 'Others' && (
            <input
              type="text"
              placeholder="Specify other jobs"
              value={otherJobs}
              onChange={(e) => setOtherJobs(e.target.value)}
              className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
            />
          )}
          <input
            type="text"
            placeholder="Town"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        <textarea
          placeholder="Write about yourself"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full px-4 py-2 mb-4 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
        />
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-all duration-300"
        >
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

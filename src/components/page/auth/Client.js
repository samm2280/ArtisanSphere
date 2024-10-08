import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import background from '../../actualcomp/images/background.jpg';

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
}

const db = firebase.firestore();

const Client = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = await db.collection('users').get();
        const fetchedUsers = usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users: ', error);
        setLoading(false); // Ensure loading is set to false on error
      }
    };

    fetchUsers();
  }, []);

  // Filter users by search term in town, name, or profession
  const filteredUsers = users.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.town && user.town.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.job && user.job.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderUsersByJob = (job) => {
    const jobFilteredUsers = filteredUsers.filter(user => user.job && user.job.toLowerCase() === job);
    return (
      <div className="p-4">
        <h2 className="font-bold mb-2">{job.charAt(0).toUpperCase() + job.slice(1)}</h2>
        {jobFilteredUsers.length > 0 ? (
          jobFilteredUsers.map((user, index) => (
            <div key={index} className="p-2 cursor-pointer border-b flex items-center" onClick={() => setSelectedUser(user)}>
              <img 
                src={user.imageUrl ? user.imageUrl : background} 
                className='rounded-full h-11 w-11 mr-4' 
                alt='Profile Picture' 
              />
              <div>
                <h2 className="font-bold mb-1 text-[15px] text-left text-black">{user.name}</h2>
                <p className="text-black mb-1 text-left">{user.job}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    );
  };

  const renderOthers = () => {
    const otherUsers = filteredUsers.filter(user => !['plumber', 'carpenter', 'mason'].includes(user.job && user.job.toLowerCase()));
    return (
      <div className="p-4">
        <h2 className="font-bold mb-2">Others</h2>
        {otherUsers.length > 0 ? (
          otherUsers.map((user, index) => (
            <div key={index} className="p-2 cursor-pointer border-b flex items-center" onClick={() => setSelectedUser(user)}>
              <img 
                src={user.imageUrl ? user.imageUrl : background} 
                className='rounded-full h-11 w-11 mr-4' 
                alt='Profile Picture' 
              />
              <div>
                <h2 className="font-bold mb-1 text-[15px] text-left text-black">{user.name}</h2>
                <p className="text-black mb-1 text-left">{user.job}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No other users found</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full p-4">
        <input
          type="text"
          placeholder="Search by town, name, or profession"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
        />
      </div>

      {loading ? (
        <div className="text-center container mx-auto mt-10 h-screen flex justify-center items-center">
          <svg aria-hidden="true" className="w-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>
      ) : (
        <>
          <div className="w-1/4">{renderUsersByJob('plumber')}</div>
          <div className="w-1/4">{renderUsersByJob('carpenter')}</div>
          <div className="w-1/4">{renderUsersByJob('mason')}</div>
          <div className="w-1/4">{renderOthers()}</div>
        </>
      )}

      {selectedUser && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
              <div className="px-4 py-2">
                <h2 className="font-bold text-2xl text-black">{selectedUser.name}</h2>
                <p className="text-gray-600 text-black">{selectedUser.job}</p>
              </div>
              <div className="px-4 py-2">
                <p className="text-gray-800 text-black">Number: {selectedUser.number}</p>
                <p className="text-gray-800 text-black">Description: {selectedUser.description}</p>
              </div>
              <div className="px-4 py-2">
                <a href={`/gallery/${selectedUser.id}`} className="text-white bg-blue-500 hover:bg-indigo-500 py-2 px-4 rounded ml-2 transition-all duration-300">Gallery</a>
                <button onClick={() => setSelectedUser(null)} className="text-white bg-blue-500 hover:bg-indigo-500 py-2 px-4 rounded transition-all duration-300">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Client;

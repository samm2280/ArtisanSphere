import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

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

const ImageDisplay = ({ userId }) => {
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image

  // Fetch image URLs for the user's profile pictures
  useEffect(() => {
    const fetchImageUrl = async (imageNumber) => {
      try {
        // Get user document from Firestore
        const userDoc = await firebase.firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          // Update state with the image URL for the corresponding imageNumber
          if (userData && userData[`profilePictureURL${imageNumber}`]) {
            switch (imageNumber) {
              case 1:
                setImageUrl1(userData.profilePictureURL1);
                break;
              case 2:
                setImageUrl2(userData.profilePictureURL2);
                break;
              case 3:
                setImageUrl3(userData.profilePictureURL3);
                break;
              default:
                break;
            }
          }
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    // Fetch URLs for all three images
    fetchImageUrl(1);
    fetchImageUrl(2);
    fetchImageUrl(3);
  }, [userId]);

  // Function to open the modal with the selected image
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className="container mx-auto p-4 mt-5"> {/* Adjusted margin-top */}
        <h2 className="text-center text-3xl font-bold mb-6">Images Uploaded by the User</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Display first image */}
          <div className="relative">
            {imageUrl1 ? (
              <img
                src={imageUrl1}
                alt="User"
                className="w-full h-60 rounded-lg cursor-pointer"
                onClick={() => handleImageClick(imageUrl1)}
              />
            ) : (
              <div className="bg-gray-200 flex justify-center items-center w-full h-60">
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            )}
          </div>
          {/* Display second image */}
          <div className="relative">
            {imageUrl2 ? (
              <img
                src={imageUrl2}
                alt="User"
                className="w-full h-60 rounded-lg cursor-pointer"
                onClick={() => handleImageClick(imageUrl2)}
              />
            ) : (
              <div className="bg-gray-200 flex justify-center items-center w-full h-60">
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            )}
          </div>
          {/* Display third image */}
          <div className="relative">
            {imageUrl3 ? (
              <img
                src={imageUrl3}
                alt="User"
                className="w-full h-60 rounded-lg cursor-pointer"
                onClick={() => handleImageClick(imageUrl3)}
              />
            ) : (
              <div className="bg-gray-200 flex justify-center items-center w-full h-60">
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for displaying the image at its normal size */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <img src={selectedImage} alt="Selected" className="max-w-none h-auto" style={{ maxHeight: '90vh' }} />
            <button
              className="absolute top-0 right-0 m-4 text-white text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;

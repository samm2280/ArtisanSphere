import React from 'react';

function Footer() {
  return (
    <div className='bg-black w-full'>
      <div className="container mx-auto px-2 py-8">
        <h1 className='text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl text-left p-3'>Contact Us</h1>
        <div className="flex justify-between mt-5">
          <div className="w-1/3">
            <h2 className="text-xl font-bold mb-4 text-white text-left px-3">Address</h2>
            <p className="text-gray-300 text-left px-3">Okomfo Anokye Street</p>
            <p className="text-gray-300 text-left px-3">Greater Accra,Tema</p>
          </div>
          <div className="w-1/3">
            <h2 className="text-xl font-bold mb-4 text-white">Phone</h2>
            <p className="text-gray-300">054-143-2280</p>
          </div>
          <div className="w-1/3">
            <h2 className="text-xl font-bold mb-4 text-white">Email</h2>
            <p className="text-gray-300">naneviesamuel1@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;

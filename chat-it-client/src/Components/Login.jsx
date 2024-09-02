import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // For making HTTP requests

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Sending a POST request to the backend login route
      const { data } = await axios.post('/api/users/login', { name, password });

      // If login is successful, store the token and navigate to another page
      localStorage.setItem('authToken', data.token);
      navigate('/dashboard');  // Navigate to a dashboard or home page
    } catch (error) {
      console.error(error);
      alert('Invalid credentials, please try again.');
    }
  };

  return (
    <div>
      <div className='white-cont h-[90vh] px-10 py-7 w-[90vw] rounded-2xl shade-g flex'>
        <div className='h-full w-[27vw] bg-transperant rounded-tl-2xl rounded-l-2xl flex flex-col items-center justify-center px-4 py-5'>
          <img src="./logo1.png" alt="logo" />
        </div>
        <div className='h-full w-[60vw] px-6 bg-transperant rounded-tr-2xl rounded-br-2xl py-5 flex flex-col gap-y-2 items-center justify-center'>
          <div className='h-[75vh] w-full flex justify-center items-center bg-[#E0DFD5] shadow-lg rounded-xl px-9 pb-4'>
            <div className="flex flex-col gap-y-16 justify-center items-center bg-[#e8e9eb] shade-g px-12 py-12 rounded-xl">
              <p className='font-medium text-3xl text-stone-500'>Login Here!!</p> 
              <div className='flex flex-col gap-y-4 items-center justify-center'>
                <input 
                  type="text" 
                  placeholder='Enter Username' 
                  className='w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input 
                  type="password" 
                  placeholder='Enter Password' 
                  className='w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-y-2 items-center justify-center'>
                <button 
                  className='w-[10vw] h-10 bg-[#f1ce00] rounded-xl text-[#6e6e6e] font-semibold hover:text-[#e0dfd5] hover:bg-[#6e6e6e] transition-all'
                  onClick={handleLogin}
                >
                  Login
                </button>
                <div className='flex items-center justify-center '>
                  <div className='text-[#6e6e6e]'>
                    {/* Space for additional content if needed */}
                  </div>
                  <div className='text-[#4b79c9] cursor-pointer' onClick={() => navigate('/signup')}>
                    Create New Account?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

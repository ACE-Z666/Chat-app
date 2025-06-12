import React from 'react'
import { useSelector } from 'react-redux';
import logo_wel from '../assets/logo_wel.png'


export default function Welcome() {
    const user = useSelector((state) => state.auth.user);

  return (
    <div className='flex flex-col h-full w-[63vw] bg-transperant rounded-tr-2xl rounded-br-2xl items-center justify-center border-b-8 border-orange-500 rounded-b-2xl'>
      <img src={logo_wel} alt="logo" className='h-3/4 mb-24' />
      <h1 className="text-4xl font-bold">Welcome, {user?.name}!</h1>
      <p className="text-lg mt-4">Start chatting with your friends or create a group!</p>
    </div>
  )
}

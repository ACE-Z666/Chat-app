import React from 'react'
import logo_wel from '../assets/logo_wel.png'


export default function Welcome() {
  return (
    <div className='flex flex-col h-full w-[63vw] bg-[#e8e9eb] rounded-tr-2xl rounded-br-2xl items-center justify-center border-b-8 border-orange-500 rounded-b-2xl'>
      <img src={logo_wel} alt="logo" className='h-3/4 mb-24' />
    </div>
  )
}

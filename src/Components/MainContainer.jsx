import React from 'react'
import Sidebar from './Sidebar'
import WorkArea from './ChatArea'


const MainContainer = () => {
  return (
        <div  className='bg-[#fff4f5] h-[90vh] w-[90vw] rounded-2xl shadow-mc flex '>
            <Sidebar/>
            <WorkArea></WorkArea>
        </div>
  )
}

export default MainContainer

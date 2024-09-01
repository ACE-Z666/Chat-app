import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import Welcome from './Welcome'
import CreateGroups from './CreateGroups'
import Users_Groups from './Users_Groups'
import { Outlet } from 'react-router-dom'


const MainContainer = () => {

  return (
        <div  className='bg-[#fff4f5] h-[90vh] w-[90vw] rounded-2xl shadow-mc flex '>
          <Sidebar/>
          <Outlet  />
          {/*<Welcome></Welcome> */}
          {/* <ChatArea/>*/} 
          {/* <CreateGroups></CreateGroups>*/}

        </div>
  )
}

export default MainContainer

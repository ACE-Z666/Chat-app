import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import Welcome from './Welcome'
import CreateGroups from './CreateGroups'
import Users_Groups from './Users'
import { Outlet } from 'react-router-dom'


const MainContainer = () => {

  return (
        <div  className='bg-transparent h-[90vh] w-[90vw] rounded-2xl flex '>
          <Sidebar/>
          <Outlet  />
          {/*<Welcome></Welcome> */}
          {/* <ChatArea/>*/} 
          {/* <CreateGroups></CreateGroups>*/}

        </div>
  )
}

export default MainContainer

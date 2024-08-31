import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import Welcome from './Welcome'
import CreateGroups from './CreateGroups'


const MainContainer = () => {

  return (
        <div  className='bg-[#fff4f5] h-[90vh] w-[90vw] rounded-2xl shadow-mc flex '>
            <Sidebar/>
          {/* <ChatArea props={conversations[0]}/> */}
          {/*<Welcome></Welcome> */}
          <CreateGroups></CreateGroups>

        </div>
  )
}

export default MainContainer

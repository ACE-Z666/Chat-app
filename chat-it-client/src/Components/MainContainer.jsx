import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import Welcome from './Welcome'
import CreateGroups from './CreateGroups'
import Users_Groups from './Users'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const MainContainer = () => {

  const lightTheme = useSelector((state) => state.theme.light);

  return (
        <div  className={'h-[90vh] w-[90vw] rounded-2xl flex px-10 py-6 items-center justify-center ' + ( lightTheme ? " white-cont" : " dark-cont")}>
          <Sidebar/>
          <Outlet  />
          {/*<Welcome></Welcome> */}
          {/* <ChatArea/>*/} 
          {/* <CreateGroups></CreateGroups>*/}

        </div>
  )
}

export default MainContainer

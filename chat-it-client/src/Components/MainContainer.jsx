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
        <div  className={'h-[90vh] sm:w-[90%]  w-[85%] rounded-2xl flex px-10 py-6 items-center justify-center mx-4 ' + ( lightTheme ? " white-cont" : " dark-cont")}>
          <Sidebar/>
          <Outlet  />
          {/*<Welcome></Welcome> */}
          {/* <ChatArea/>*/} 
          {/* <CreateGroups></CreateGroups>*/}

        </div>
  )
}

export default MainContainer

import { useState } from 'react'
import MainContainer from './Components/MainContainer'
import Login from './Components/Login'
import Welcome from './Components/Welcome'
import Users from './Components/Users'
import ChatArea from './Components/ChatArea'
import CreateGroups from './Components/CreateGroups'
import Groups from './Components/Groups'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {
  const lightTheme = useSelector((state) => state.theme.light);
  const [count, setCount] = useState(0)

  return (
    <>
    <div className={'h-screen flex items-center justify-center m-0' + (lightTheme ? " white-img" : " dark-img")}>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='app' element={<MainContainer/>}>
       <Route path='welcome' element={<Welcome/>}></Route>
       <Route path='users' element={<Users/>}></Route>
       <Route path='groups' element={<Groups/>}></Route>
       <Route path='chat' element={<ChatArea/>}></Route>
       <Route path='create_groups' element={<CreateGroups />} ></Route>
      </Route>
     </Routes>
    </div>
    </>
  )
}

export default App

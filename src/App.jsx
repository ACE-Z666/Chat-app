import { useState } from 'react'
import MainContainer from './Components/MainContainer'
import Login from './Components/Login'
import Welcome from './Components/Welcome'
import Users_Groups from './Components/Users_Groups'
import ChatArea from './Components/ChatArea'
import CreateGroups from './Components/CreateGroups'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='h-screen bg-white flex items-center justify-center m-0'>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='app' element={<MainContainer/>}>
       <Route path='welcome' element={<Welcome/>}></Route>
       <Route path='users_groups' element={<Users_Groups/>}></Route>
       <Route path='chat' element={<ChatArea/>}></Route>
       <Route path='create_groups' element={<CreateGroups />} ></Route>
      </Route>
     </Routes>
    </div>
    </>
  )
}

export default App

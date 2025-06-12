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
import SignUp from './Components/SignUp'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  const lightTheme = useSelector((state) => state.theme.light);
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <>
      <div id="main" className={'h-screen flex items-center justify-center m-0' + (lightTheme ? " white-img" : " dark-img")}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <MainContainer setSelectedChat={setSelectedChat} />
              </ProtectedRoute>
            }
          >
            <Route path="welcome" element={<Welcome />} />
            <Route path="users" element={<Users setSelectedChat={setSelectedChat} />} />
            <Route path="groups" element={<Groups />} />
            <Route path="chat" element={<ChatArea selectedChat={selectedChat} />} />
            <Route path="create_groups" element={<CreateGroups />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

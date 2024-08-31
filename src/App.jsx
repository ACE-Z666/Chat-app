import { useState } from 'react'
import MainContainer from './Components/MainContainer'
import Login from './Components/Login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='h-screen bg-white flex items-center justify-center m-0'>
     {/* <MainContainer></MainContainer> */}
     <Login></Login>
    </div>
    </>
  )
}

export default App

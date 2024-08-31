import { useState } from 'react'
import MainContainer from './Components/MainContainer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='h-screen bg-white flex items-center justify-center m-0'>
      <MainContainer className=''></MainContainer>
    </div>
    </>
  )
}

export default App

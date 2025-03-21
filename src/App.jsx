import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { mockData } from './utils/mockData.js'


function App() {

  const [searchTerm, setSearchTerm]=useState("");
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  return(
    <div className='box-border m-0 p-0 w-full'>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setSearchTerm={setSearchTerm} />
      <Outlet context={{isLoggedIn,setIsLoggedIn,searchTerm}} />
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { mockData } from './utils/mockData.js'


function App() {

  const [searchTerm, setSearchTerm]=useState("");

  return(
    <div className='box-border m-0 p-0 w-full'>
      <Header setSearchTerm={setSearchTerm} />
      <Outlet context={{searchTerm}} />
    </div>
  )
}

export default App

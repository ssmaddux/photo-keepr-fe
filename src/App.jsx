import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'

function App() {
  

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Photos from './components/Photos'
import Comments from './components/Comments'

function App() {
  

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/photos' element={<Photos/>}/>
        <Route path='/comments' element={<Comments/>}/>
      </Routes>
    </div>
  )
}

export default App

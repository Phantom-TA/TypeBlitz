import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router , Routes , Route } from "react-router"
import './App.css' 
import Home from './pages/Home'
import { SettingsProvider } from './context/SettingsContext'

function App() {
 


  return (
    <SettingsProvider>
    <Router>
     <Routes>
      <Route path='/' element={<Home />} />
     </Routes>
    </Router>
    </SettingsProvider>
   
  )
}

export default App

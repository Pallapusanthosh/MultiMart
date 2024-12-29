import React from 'react'
import Landingpage from './vendordashboard/pages/Landingpage'
import "./App.css"
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='' element={<Landingpage/>}></Route>
      </Routes>
    
    </div>
  )
}

export default App

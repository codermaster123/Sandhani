import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <Navbar/>
      
    </div>
  )
}

export default App

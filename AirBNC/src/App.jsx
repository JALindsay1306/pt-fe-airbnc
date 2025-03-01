import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import PropertyFeed from './components/PropertyFeed'
import Property from './components/property/Property';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
            <Route path="/" element={<PropertyFeed />} />
            <Route path="/property/:id" element={<Property/>} />
          </Routes>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PropertyFeed from './components/PropertyFeed'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <PropertyFeed/>
    </>
  )
}

export default App

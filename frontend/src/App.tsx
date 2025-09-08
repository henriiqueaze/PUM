import { useState } from 'react'
import './App.css'
import CreatePage from './pages/CreatePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CreatePage />
    </>
  )
}

export default App

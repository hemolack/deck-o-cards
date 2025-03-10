import { useState } from 'react'
import Deck from './Deck'
import viteLogo from '/icon.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Deck />
    </>
  )
}

export default App

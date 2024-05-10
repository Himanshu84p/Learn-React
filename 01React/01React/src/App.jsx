import { useState } from 'react'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0)

  const increaseCounter = () => {
    if (counter == 20) {
      setCounter(20)
    } else {
      setCounter(counter + 1)
    }
  }
  const decreaseCounter = () => {
    if (counter == 0) {
      setCounter(0)
    } else {
      setCounter(counter - 1)
    }
  }

  return (
    <>
      <h1>React Starter {counter}</h1>

      <button onClick={increaseCounter} >Increase Counter</button>
      <button onClick={decreaseCounter} >Decrease Counter</button>
    </>
  )
}

export default App

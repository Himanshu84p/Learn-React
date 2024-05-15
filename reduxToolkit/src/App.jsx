import './App.css'
import AddFrom from './components/AddFrom.jsx'
import Todos from './components/Todos.jsx'

function App() {

  return (
    <>
    <h1 className='text-white bg-slate-900 p-4 rounded-lg shadow-md text-4xl'>Getting Started with redux Toolkit</h1>
    <AddFrom />
    <Todos />
    </>
  )
}

export default App

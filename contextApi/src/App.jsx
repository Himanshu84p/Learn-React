import './App.css'
import UserContextProvider from './context/UserContextProvider'
import Login from './components/Login'
import Profile from './components/Profile'


function App() {

  return (
    <UserContextProvider>
      <h1 className='bg-gray-500 text-white text-5xl p-6 text-center'>Learn React Context Api with Himanshu</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App

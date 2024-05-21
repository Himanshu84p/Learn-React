import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch = useDispatch()

    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button className='bg-blue-400 text-black hover:scale-110 shadow-md' onClick={handleLogout}>Logout</button>
  )
}

export default LogoutBtn    
import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {userId} = useParams()
  return (
    <>
    <h1 className=' bg-slate-500 p-2 text-white'>User ID : {userId}</h1>
    </>
  )
}

export default User
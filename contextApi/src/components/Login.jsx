import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({username, password})
    }
    return (
    <div className="p-4 text-center bg-teal-400">
        <h2 className="text-xl m-4">Login</h2>
        <label>Username : </label>
        <input placeholder="Username" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} />
{" "}
        <label>Password :</label>
        <input placeholder="Password" type="text" value={password} onChange={(e) => {setPassword(e.target.value)}}  />

        <button onClick={handleSubmit} className="bg-black px-2 ml-3 text-cyan-100 rounded-md" >Submit</button>
    </div>
  )
}

export default Login
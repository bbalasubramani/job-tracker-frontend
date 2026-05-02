import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate=useNavigate()
    async function handleSubmit(e){
        e.preventDefault()
        const response=await axios.post('http://localhost:3000/login', { email, password })
        localStorage.setItem('token',response.data.token)
        navigate('/dashboard')
    }
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    return (
        <div>
        <h1>Login Page</h1>
        <form>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) =>setPassword(e.target.value)}/>
            <button onClick={handleSubmit}>Login</button>
        </form>
        </div>
    )
}

export default Login;
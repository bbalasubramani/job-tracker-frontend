import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate=useNavigate()
    async function handleSubmit(e){
        e.preventDefault()
        const response=await axios.post('http://localhost:3000/register', { username, email, password })
        navigate('/login')
    }

    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    return (
        <div>
        <h1>SignUp Page</h1>
        <form>
            <input type="text" placeholder="Username" onChange={(e)=> setUsername(e.target.value)}/>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) =>setPassword(e.target.value)}/>
            <button onClick={handleSubmit}>Register</button>
        </form>
        </div>
    )
}

export default Register;
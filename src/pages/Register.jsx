import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate=useNavigate()
    async function handleSubmit(e){
        e.preventDefault()
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/register`, { username, email, password })
        navigate('/login')
    }

    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    return (
        <div className="h-screen bg-green-900 flex justify-center items-center">
        <div className="bg-white  rounded-2xl p-8 w-96 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-green-900">Create Account</h2>
            <form className="flex flex-col gap-4">
            <input className="w-full border border-green-300 rounded-lg px-4 py-2 outline-none bg-green-50" type="text" placeholder="Username" onChange={(e)=> setUsername(e.target.value)}/>
            <input className="w-full border border-green-300 rounded-lg px-4 py-2 outline-none bg-green-50" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input className="w-full border border-green-300 rounded-lg px-4 py-2 outline-none bg-green-50" type="password" placeholder="Password" onChange={(e) =>setPassword(e.target.value)}/>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700" onClick={handleSubmit}>Register</button>
            <p className="text-center text-sm text-green-900">
                        Already have an account?{" "}
                        <span onClick={() => navigate('/login')} className="font-semibold cursor-pointer hover:underline">
                            Login
                        </span>
                    </p>
        </form>
        </div>
        </div>
    )
}

export default Register;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate=useNavigate()
    async function handleSubmit(e){
        e.preventDefault()
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password })
        localStorage.setItem('token',response.data.token)
        navigate('/dashboard')
    }
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    return (
        <div className="flex h-screen">
            {/* Left Side */}
             <div className="w-1/2 flex justify-center items-center bg-green-50">
             <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-green-900">Welcome Back</h2>
                <form className="flex flex-col gap-4 w-80">
                    <input className="w-full border border-green-300 rounded-lg px-4 py-2 outline-none bg-green-50" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <input className="w-full border border-green-300 rounded-lg px-4 py-2 outline-none bg-green-50" type="password" placeholder="Password" onChange={(e) =>setPassword(e.target.value)}/>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700" onClick={handleSubmit}>Login</button>
                    <p className="text-center text-sm text-green-900">
                        Don't have an account?{" "}
                        <span onClick={() => navigate('/register')} className="font-semibold cursor-pointer hover:underline">
                            Register
                        </span>
                    </p>
                    </form>
            </div>
        </div>

        {/* Right Side */}
   <div className="w-1/2 bg-green-900 flex flex-col justify-center items-center px-12 text-white">
   <h1 className="text-4xl font-bold text-center leading-snug mb-4">
    Track Your Job Applications <span className="text-green-300">with Ease</span>
   </h1>
   <p className="text-center text-green-100 text-lg">
    Manage your job applications, bookmark opportunities and stay on top of every stage of the process.
   </p>
   </div>

  </div>
    )
}

export default Login;
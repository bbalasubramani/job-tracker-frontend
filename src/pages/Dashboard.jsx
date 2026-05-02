import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard(){
    const [jobs,setJobs]=useState([])
    const [company,setCompany]=useState('')
    const [role,setRole]=useState('')
    const [status,setStatus]=useState('')
    const [applied_date,setApplied_date]=useState('')

    const navigate= useNavigate()
    async function fetchJobs(){
        const token=localStorage.getItem('token')
        const response=await axios.get('http://localhost:3000/jobs',{
            headers: {
                'Authorization':'Bearer ' + token
            }
        })
        setJobs(response.data)
    }
    useEffect(()=>{
        if (!localStorage.getItem('token')){
            navigate('/login')
        }
    fetchJobs()
    },[])

    async function handleAddJob(){
        const token=localStorage.getItem('token')
        await axios.post('http://localhost:3000/jobs',
            {company,role,status,applied_date},
            {headers:{'Authorization':'Bearer ' + token}}
        )
        fetchJobs()
    }

    async function handleDeleteJob(id){
        const token=localStorage.getItem('token')
        await axios.delete(`http://localhost:3000/jobs/${id}`,{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        fetchJobs()
    }

    function handleLogout(){
        localStorage.clear()
        navigate('/login')

    }
    return(
        <div>
    <h1>Dashboard</h1>
    {/* add job form */}
    <form>
        <input type="text" placeholder="Company Name" onChange={(e)=>setCompany(e.target.value)} />
        <input type="text" placeholder="Role" onChange={(e)=>setRole(e.target.value)} />
        <input type="text" placeholder="Status" onChange={(e)=>setStatus(e.target.value)} />
        <input type="date" placeholder="Applied_date" onChange={(e)=>setApplied_date(e.target.value)} />
        <button onClick={handleAddJob}>Add Job</button>
    </form>
    {jobs.map(job=>(
            <div key={job.id}>
                <p>{job.company}-{job.role}-{job.status}</p>
                <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
            </div>
        ))}
        <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard;
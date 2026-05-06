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
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/jobs`,{
            headers: {
                'Authorization':'Bearer ' + token,
                'Cache-Control': 'no-cache'
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

    async function handleAddJob(e){
        e.preventDefault()
        const token=localStorage.getItem('token')
        await axios.post(`${import.meta.env.VITE_API_URL}/jobs`,
            {company,role,status,applied_date},
            {headers:{'Authorization':'Bearer ' + token}}
        )
        fetchJobs()
    }

    async function handleDeleteJob(id){
        const token=localStorage.getItem('token')
        await axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${id}`,{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        fetchJobs()
    }

    async function handleUpdateStatus(id, newStatus){
        const token=localStorage.getItem('token')
        await axios.put(`${import.meta.env.VITE_API_URL}/jobs/${id}`,{
            status:newStatus},
            {headers:{'Authorization':'Bearer ' + token}}
        )
        fetchJobs()
    }

    function handleLogout(){
        localStorage.clear()
        navigate('/login')

    }
    return(
        <div>
            <nav className="flex items-center px-8 py-4 bg-green-900">
                <h1 className="text-white font-bold text-xl">JobTracker</h1>
                <button className="ml-auto text-white border border-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={handleLogout}>Logout
                </button>
            </nav>
            <div className="p-8 bg-green-50 min-h-screen">
    {/* add job form */}
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold text-green-900 mb-4">Add New Job</h2>
    <form className="flex flex-row gap-4 items-center">
        <input className="border border-green-300 rounded-lg px-4 py-2 outline-none bg-green-50 flex-1" type="text" placeholder="Company Name" onChange={(e)=>setCompany(e.target.value)} />
        <input className="border border-green-300 rounded-lg px-4 py-2 outline-none bg-green-50 flex-1" type="text" placeholder="Role" onChange={(e)=>setRole(e.target.value)} />
        <select onChange={(e) => setStatus(e.target.value)} className="border border-green-300 rounded-lg px-4 py-2 outline-none bg-green-50 flex-1">
  <option value="">Select Status</option>
  <option value="Applied">Applied</option>
  <option value="Interview">Interview</option>
  <option value="Selected">Selected</option>
  <option value="Rejected">Rejected</option>
</select>
        <input className="border border-green-300 rounded-lg px-4 py-2 outline-none bg-green-50 flex-1" type="date" placeholder="Applied_date" onChange={(e)=>setApplied_date(e.target.value)} />
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700" onClick={handleAddJob}>Add Job</button>
    </form>
    </div>
    <div className="grid grid-cols-1 gap-4">
  {jobs.map(job => (
    <div key={job.id} className="bg-white rounded-2xl p-6 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-green-900">{job.company}</h3>
        <p className="text-gray-500">{job.role}</p>
        <p className="text-gray-400 text-sm">{new Date(job.applied_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
      </div>
      <div className="flex items-center gap-4">
        <select
  value={job.status}
  onChange={(e) => handleUpdateStatus(job.id, e.target.value)}
  className={`rounded-full px-3 py-1 outline-none text-sm font-semibold border-0 cursor-pointer ${
    job.status === 'Selected' ? 'bg-green-100 text-green-800' :
    job.status === 'Rejected' ? 'bg-red-100 text-red-800' :
    job.status === 'Interview' ? 'bg-orange-100 text-orange-800' :
    'bg-yellow-100 text-yellow-800'
  }`}>
  <option value="Applied">Applied</option>
  <option value="Interview">Interview</option>
  <option value="Selected">Selected</option>
  <option value="Rejected">Rejected</option>
</select>
        <button onClick={() => handleDeleteJob(job.id)} className="text-red-400 hover:text-red-600 font-semibold text-sm">
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
        </div>
        </div>
    )
}

export default Dashboard;
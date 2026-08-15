import { useState} from 'react'
import toast from 'react-hot-toast'
import { PulseLoader } from 'react-spinners'

const UserForm = ({Users,setUsers}) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [errors, seterrors] = useState(null)
    const [loading, setloading] = useState(false)
    const [formData, setformData] = useState({
        name :"",
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setformData({...formData,[name]:value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let error = {}
        if (!formData.name) {
            error.name = "Name is Required"
        }
        if (!formData.email) {
            error.email = "Email Required"
        }
        if (!formData.email.includes("@") || !formData.email.includes(".")|| formData.email.includes(" ")) {
            error.email = "Invalid Email"
        }
        if (!formData.password || formData.password.trim().length < 6) {
            error.password = "Password should not be empty and it must be of 6 characters"
        }
        seterrors(error)
        if(Object.keys(error).length>0){
            return;
        }

        try{
            setloading(true)
            let response = await fetch(`${API_URL}/admin/register`,{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            let data = await response.json()
            if(response.status==201){
                setUsers([...Users,data])
                console.log(data);
                
                toast.success("Employee register Succcesfully")
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error("Some error occured")
        }finally{
            setloading(false)
        }
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className='w-full px-5 py-3 bg-white rounded flex flex-col gap-3'>
                <h1 className='font-bold text-2xl text-center'>Add new employee</h1>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='font-bold'>Name</label>
                    <input className='border p-2 rounded' type="text" placeholder='Enate Name' name='name' id='name'
                    value={formData.name}
                    onChange={handleChange} />
                    {errors && errors.name &&<p className='text-red-500'>{errors.name}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='font-bold'>Email</label>
                    <input className='border p-2 rounded' type="Email" placeholder='Enter Email' name='email' id='email' 
                     value={formData.email}
                    onChange={handleChange}/>
                    {errors && errors.email &&<p className='text-red-500'>{errors.email}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="password" className='font-bold'>Password</label>
                    <input className='border p-2 rounded' type="password" placeholder='Enter password' name='password' id='password' 
                     value={formData.password}
                    onChange={handleChange}/>
                    {errors && errors.password &&<p className='text-red-500'>{errors.password}</p>}
                </div>
                <button className='cursor-pointer font-bold bg-amber-400 p-1 rounded' disabled={loading}>{loading?<PulseLoader size={12} color='#ffffff'/>:"Add New Employee"}</button>
            </div>
        </form>
    )
}

export default UserForm

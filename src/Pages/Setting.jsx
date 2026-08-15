import React, { useContext, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { Appcontext } from './AppContextProvider'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Setting = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { userdata, setuserdata, auth, setauth } = useContext(Appcontext)
    const [errors, seterrors] = useState(null)
    const [loading, setloading] = useState(false)
    const [formData, setformData] = useState(auth.role == "ADMIN" ? {
        shopName: userdata ? userdata.shopName : "",
        name: userdata ? userdata.name : "",
        email: userdata ? userdata.email : "",
        address: userdata ? userdata.shopAddress : ""
    } : { name: userdata ? userdata.name : "" })
    const navigate = useNavigate()

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setformData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = {}
        if (!formData.name) {
            error.name = "Name is Required"
        }
        if (auth.role == "ADMIN") {
            if (!formData.shopName) {
                error.shopName = "ShopName is Required"
            }
            if (!formData.address) {
                error.address = "Address is Required"
            }
            if (!formData.email) {
                error.email = "Email Required"
            }
            if (!formData.email.includes("@") || !formData.email.includes(".") || formData.email.includes(" ")) {
                error.email = "Invalid Email"
            }

        }
        seterrors(error)
        if (Object.keys(error).length > 0) {
            return;
        }
        if (auth.role == "ADMIN") {
            try {
                setloading(true)
                let response = await fetch(`${API_URL}/admin/update`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        formData)
                })
                let data = await response.json()
                if (response.status == 200) {
                    if (userdata.email !== formData.email) {
                        navigate("/login")
                        localStorage.removeItem("token")
                        localStorage.removeItem("auth")
                        setauth(null, null)
                    }
                    console.log(data);
                    setuserdata(data)
                    toast.success("Detail update Succcesfully")
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error("Detail update not Succcesfully")
            } finally {
                setloading(false)
            }
        } else {
            try {
                setloading(true)
                let response = await fetch(`${API_URL}/user/update`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        formData)
                })
                let data = await response.json()
                if (response.status == 200) {
                    if (userdata.email !== formData.email) {
                        navigate("/login")
                        localStorage.removeItem("token")
                        localStorage.removeItem("auth")
                        setauth(null, null)
                    }
                    console.log(data);
                    setuserdata(data)
                    toast.success("Detail update Succcesfully")
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error("Detail update not Succcesfully")
            } finally {
                setloading(false)
            }
        }
    }
    return (
        <div className='h-[calc(100vh-80px)] flex justify-center items-center p-4'>
            <form onSubmit={handleSubmit} className='w-full lg:w-170 shadow-[0_0_15px_rgba(0,0,0,3)] rounded'>
                <div className='w-full px-5 py-3 bg-white rounded flex flex-col gap-3'>
                    <h1 className='font-bold text-2xl text-center'>Edit Profile</h1>
                    {auth.role == "ADMIN" && <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='font-bold'>Shop Name</label>
                        <input className='border p-2 rounded' type="text" placeholder='Enter Shop Name' name='shopName' id='shopName'
                            value={formData.shopName}
                            onChange={handleChange} />
                        {errors && errors.shopName && <p className='text-red-500'>{errors.shopName}</p>}
                    </div>}

                    {auth.role == "ADMIN" && <>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className='font-bold'>Email</label>
                            <input className='border p-2 rounded' type="Email" placeholder='Enter Email' name='email' id='email'
                                value={formData.email}
                                onChange={handleChange} />
                            {errors && errors.email && <p className='text-red-500'>{errors.email}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className='font-bold'>Address</label>
                            <input className='border p-2 rounded' type="text" placeholder='Enter Address' name='address' id='address'
                                value={formData.address}
                                onChange={handleChange} />
                            {errors && errors.address && <p className='text-red-500'>{errors.address}</p>}
                        </div>
                    </>}
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='font-bold'>Owner Name</label>
                        <input className='border p-2 rounded' type="text" placeholder='Enter owner Name' name='name' id='name'
                            value={formData.name}
                            onChange={handleChange} />
                        {errors && errors.name && <p className='text-red-500'>{errors.name}</p>}
                    </div>

                    <button className='cursor-pointer font-bold bg-amber-400 p-1 rounded' disabled={loading}>{loading ? <PulseLoader size={12} color='#ffffff' /> : "Update Detail"}</button>
                </div>
            </form>
        </div>
    )
}

export default Setting
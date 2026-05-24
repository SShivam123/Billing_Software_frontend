import React, { useContext } from 'react'
import billback from "../assets/billback.jpg"
import BillingImage from "../assets/BillingImage.avif"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { PulseLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import AppContextProvider, { Appcontext } from './AppContextProvider'

const Login = () => {
    const { setAuthData, getLoggedinUser, userdata, setloadingUsere } = useContext(Appcontext)
    const navigate = useNavigate();
    const [error, seterror] = useState({})
    const [loading, setloading] = useState(false)
    const [loginform, setloginform] = useState({
        email: "",
        password: ""
    })

    const onChangerHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setloginform({ ...loginform, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
        if (!loginform.email || !loginform.email.includes('@') || loginform.email.includes(" ")) {
            errors.email = "Email invalid"
        }
        if (!loginform.password || loginform.password.trim().length < 6 || loginform.password.includes(" ")) {
            errors.password = "password length minimum 6.."
        }
        seterror(errors)
        if (Object.keys(errors).length > 0) {
            return;
        }
        setloading(true)
        try {
            let response = await fetch("https://billingsoftwarebackend-production-c836.up.railway.app/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginform)
            })
            // console.log(await response.json());

            let data = await response.json()
            if (response.status == 200) {
                console.log(data);
                localStorage.setItem("token", data.token)
                localStorage.setItem("role", data.role)
                setAuthData(data.token, data.role)
                navigate("/")
                toast.success("Login Succcesfully")
                getLoggedinUser()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Email password invalid")
        } finally {
            setloading(false)
        }
    }

    return (
        // <div className="w-full h-screen bg-cover bg-center flex justify-center items-center"
        //     style={{ backgroundRepeat: "no-repeat", backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${BillingImage})` }}>
        //     <form action="" onSubmit={handleSubmit}>
        //         <div className='bg-white rounded w-100 flex flex-col gap-2 p-3'>
        //             <div className='text-center'>
        //                 <h1 className='font-bold text-3xl'>Sign in</h1>
        //                 <p className='font-bold'>Sing in below to access your account</p>
        //             </div>
        //             <div className='flex flex-col gap-1'>
        //                 <label className='font-bold' htmlFor="email">Email address</label>
        //                 <input className='border p-1 rounded' type="email" name='email' placeholder='Yourname@example.com'
        //                     value={loginform.email} onChange={onChangerHandler} />
        //                 {error.email && <p className='text-red-500'>{error.email}</p>}
        //             </div>
        //             <div className='flex flex-col gap-1'>
        //                 <label className='font-bold' htmlFor="password">Password</label>
        //                 <input className='border p-1 rounded' type="password" name='password' placeholder='***********' value={loginform.password} onChange={onChangerHandler} />
        //                 {error.password && <p className='text-red-500'>{error.password}</p>}
        //             </div>
        //             <button className='bg-black rounded p-1 cursor-pointer text-white font-bold'>{loading ? <PulseLoader loading={true} size={17} color='#ffffff' /> : "Signin"}</button>
        //             <p className='text-center'>Don't have an account ? {" "} <span className='underline cursor-pointer text-blue-500' onClick={() => navigate("/register")}>Register</span> </p>
        //         </div>
        //     </form>
        // </div>
        <div
            className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
            style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${BillingImage})`
            }}
        >

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[400px]"
            >

                <div className="bg-white rounded-lg p-4 flex flex-col gap-3">

                    <div className="text-center">

                        <h1 className="font-bold text-3xl">
                            Sign in
                        </h1>

                        <p className="font-bold text-sm">
                            Sign in below to access your account
                        </p>

                    </div>

                    <div className="flex flex-col gap-1">

                        <label className="font-bold">
                            Email address
                        </label>

                        <input
                            className="border p-2 rounded outline-none"
                            type="email"
                            name="email"
                            placeholder="Yourname@example.com"
                            value={loginform.email}
                            onChange={onChangerHandler}
                        />

                        {error.email && (
                            <p className="text-red-500 text-sm">
                                {error.email}
                            </p>
                        )}

                    </div>

                    <div className="flex flex-col gap-1">

                        <label className="font-bold">
                            Password
                        </label>

                        <input
                            className="border p-2 rounded outline-none"
                            type="password"
                            name="password"
                            placeholder="***********"
                            value={loginform.password}
                            onChange={onChangerHandler}
                        />

                        {error.password && (
                            <p className="text-red-500 text-sm">
                                {error.password}
                            </p>
                        )}

                    </div>

                    <button className="bg-black rounded p-2 cursor-pointer text-white font-bold">

                        {loading ? (
                            <PulseLoader
                                loading={true}
                                size={17}
                                color="#ffffff"
                            />
                        ) : (
                            "Signin"
                        )}

                    </button>

                    <p className="text-center text-sm">

                        Don't have an account?{" "}

                        <span
                            className="underline cursor-pointer text-blue-500"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </span>

                    </p>

                </div>

            </form>

        </div>

    )
}

export default Login

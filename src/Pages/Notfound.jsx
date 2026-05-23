import React from 'react'
import { useNavigate } from 'react-router-dom'

const Notfound = () => {
    const navigate = useNavigate()
  return (
    <div className='h-[calc(100vh-80px)] w-full flex justify-center items-center'>
        <div className='w-120 flex flex-col gap-4 justify-center items-center rounded p-5 shadow-[0_0_15px_rgba(0,0,0,0.5)]'>
            <h1 className='text-red-500 text-8xl font-bold'>404</h1>
            <h2 className='font-bold text-2xl'>Oops! page not found</h2>
            <p className='font-semibold'>The page you're looking fordoes'nt existor has been moved.</p>
            <button className='bg-blue-500 rounded p-1.5 text-white cursor-pointer' onClick={()=>navigate("/")}>Go to Homepage</button>
        </div>
        
    </div>
  )
}

export default Notfound
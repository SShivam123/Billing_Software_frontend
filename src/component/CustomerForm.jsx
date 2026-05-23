import React from 'react'

const CustomerForm = ({customername, setcustomername, customerNumber, setcustomerNumber}) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <label htmlFor="customername" className='font-bold' >Customer Name</label>
        <input type="text" className='border bg-white p-1 rounded w-2/3 text-black' value={customername} onChange={(e)=>setcustomername(e.target.value)}/>
      </div>
      <div className='flex gap-2'>
        <label htmlFor="mobilenumber" className='font-bold'>Mobile Number</label>
        <input type="Number" className='border bg-white p-1 rounded w-2/3 text-black' value={customerNumber} type="tel" maxLength={10} onChange={(e)=>setcustomerNumber(e.target.value)}/>
      </div>
    </div>
  )
}

export default CustomerForm

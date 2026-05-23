import React, { useContext } from 'react'
import { Appcontext } from './AppContextProvider'

const ShowPopUp = ({orderDetails,setshowPopUp, handlePrintRecipt}) => {
    // console.log(orderDetails);
    const {userdata} = useContext(Appcontext)
    return (
        <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,0.7)]'>
            <div className='w-95 bg-white text-black rounded p-3 '>
                <h2 className='text-center font-bold text-2xl'>M/S.{userdata && userdata.shopName}</h2>
                <h2 className='text-center font-bold '>{userdata && userdata.shopAddress}</h2>
                <h2 className='text-center font-bold text-xl'>Order Receipt</h2>
                <div className='mb-2 flex flex-col gap-1'>
                    <div className='flex gap-3'>
                        <p className='font-semibold'>Order ID:-</p>
                        <p>{orderDetails.orderId}</p>
                    </div>
                    <div className='flex gap-3'>
                        <p className='font-semibold'>Name:-</p>
                        <p>{orderDetails.customerName}</p>
                    </div>
                    <div className='flex gap-3'>
                        <p className='font-semibold'>Phone:-</p>
                        <p>{orderDetails.mobileNumber}</p>
                    </div>
                </div>
                <hr />
                <div className='mt-2 mb-2 flex flex-col gap-1'>
                    <h1 className='font-bold text-center'>Item Ordered</h1>
                    {orderDetails.cartItems.map((item,index)=>(
                           <div  className='flex justify-between'>
                        <p className='font-semibold'>{item.name}</p>
                        <p>₹{(item.price*item.quantity).toFixed(2)}</p>
                    </div>
                    ))}
                </div>
                <hr />
                 <div className='mt-2 mb-2 flex flex-col gap-1'>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>SubTotal:-</p>
                        <p>₹{orderDetails.subTotal}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>Tax(1%):-</p>
                        <p>₹{orderDetails.tax}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>GrandTotal:-</p>
                        <p>₹{orderDetails.grandTotal}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>PayMethod:-</p>
                        <p>{orderDetails.paymentMethod}</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='font-semibold'>RazorpayOrder ID:-</p>
                        <p>{orderDetails.paymentDetails?.razorpayOrderId}</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='font-semibold'>RazorpayPayment ID:-</p>
                        <p>{orderDetails.paymentDetails?.razorpayPaymentId}</p>
                    </div>
                </div>
                <div  className='flex gap-2 justify-end'>
                    <button className='bg-amber-300 rounded px-2 py-1 cursor-pointer' onClick={handlePrintRecipt}>Print Receipt</button>
                    <button className='bg-red-500 rounded px-2 py-1 cursor-pointer' onClick={()=>setshowPopUp(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ShowPopUp

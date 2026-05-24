import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const OrderHistory = () => {
    const [loading, setloading] = useState(false)
    const [orders, setorders] = useState([])
    console.log(orders);


    useEffect(() => {
        const loadAllOrders = async () => {
            try {
                setloading(true)
                let response = await fetch("https://billingsoftwarebackend-production-c836.up.railway.app/orders/allorders", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        // "Content-Type": "application/json"
                    }
                })
                let data = await response.json()
                if (response.status == 200) {
                    console.log(data);
                    setorders(data)
                } else {
                    setorders([])
                }
            } catch (error) {
                toast.error("unable to load order")
            } finally {
                setloading(false)
            }
        }
        loadAllOrders()
    }, [])

    const formatItems = (item) => {
        return item.map(item => `${item.name} X ${item.quantity}`).join(',')
    }

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }
    if (loading) {
        return <div className='text-2xl text-center font-bold mt-5'>Loading....</div>
    }
    if (orders.length == 0) {
        return <div className='text-2xl text-center font-bold mt-5 text-red-500'>No orders found....</div>
    }
    return (
        <div>
            <h2 className='text-black text-3xl font-bold flex justify-center items-center'>TOTAL ORDER'S</h2>
            <div className='overflow-scroll'>
                <table className='min-w-full'>
                    <thead>
                        <tr className='bg-cyan-300 font-bold px-3 py-3 text-xl'>
                            <th className='px-3 py-3'>Order Id</th>
                            <th className='px-3 py-3'>CustomerName/No.</th>
                            <th className='px-3 py-3'>Item</th>
                            <th className='px-3 py-3'>Total</th>
                            <th className='px-3 py-3'>Payment</th>
                            <th className='px-3 py-3'>Status</th>
                            <th className='px-3 py-3'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.orderId} className={index % 2 == 0 ? "bg-gray-300" : "bg-gray-400"}>
                                <td className='px-10 py-1'>{order.orderId}</td>
                                <td className='px-10 py-1'>{order.customerName} <br />{order.mobileNumber}</td>
                                <td className='px-10 py-1'>{formatItems(order.cartItems)}</td>
                                <td className='px-10 py-1'>{order.grandTotal}</td>
                                <td className='px-10 py-1'>{order.paymentMethod}</td>
                                <td className='px-10 py-1'><span className={`${order.paymentDetail.status == "COMPLETE" ? "bg-green-500" : "bg-amber-300"} rounded p-1`}>{order.paymentDetail.status}</span></td>
                                <td className='px-10 py-1'><p>
                                    {new Date (formatDate.order.createdAt).toLocaleString("en-IN", {
                                        timeZone: "Asia/Kolkata"
                                    })}
                                </p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
// {formatDate(order.createAt)}
export default OrderHistory

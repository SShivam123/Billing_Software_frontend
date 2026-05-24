
import React, { useContext, useEffect, useState } from 'react'
import AppContextProvider, { Appcontext } from './AppContextProvider'
import toast from 'react-hot-toast';
import { ClockFading, IndianRupee, ShoppingCart } from 'lucide-react'
const Dashboard = () => {
  const { userdata, loadCategory, loadItems } = useContext(Appcontext)
  // console.log(userdata);
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState([])
  // console.log(data);

  useEffect(() => {
    loadCategory()
    loadItems()
  }, [])

  useEffect(() => {
    const loadDashBoardData = async () => {
      try {
        setloading(true)
        let response = await fetch("https://billingsoftwarebackend-production-c836.up.railway.app/dashboard/", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        })
        if (response.status == 200) {
          let data = await response.json()
          setdata(data)
        }
      } catch (error) {
        toast.error("Something went wrong")
      } finally {
        setloading(false)
      }
    }
    loadDashBoardData();
  }, [])
  if (loading) {
    return <div className='text-center font-bold text-3xl m-3'>Loading...</div>
  }
  if (!data) {
    return <div className='text-center font-bold text-3xl m-3'>No data avilable...</div>
  }

  return (
    <div className='h-[calc(100vh-76px)] bg-black/85 p-3 overflow-y-auto dashboard'>
      <div className='flex justify-between items-center'>
        <h1>
          <p className='text-3xl text-green-300 font-bold'>WellCome {userdata && userdata.shopName}</p>
        </h1>
        <p className='text-green-300 font-bold'>Login User Name:-{userdata?.name}</p>
      </div>
      <div className='flex sm:flex-row flex-col justify-between gap-5'>
        <div className='bg-black rounded flex gap-2 items-center sm:w-1/2 w-full p-4'>
          <span className='bg-green-100 rounded-full font-bold p-2'>
            <IndianRupee color='green' />
          </span>
          <div className='flex flex-col gap-2'>
            <p className='text-white'>Today's Sales</p>
            <h1 className='text-white font-bold text-xl'>₹{(data?.todaySale ?? 0).toFixed(2)}</h1>
          </div>
        </div>
        <div className='bg-black rounded flex gap-2 items-center sm:w-1/2 w-full p-4'>
          <span className='bg-green-100 rounded-full font-bold p-2'>
            <ShoppingCart color='green' />
          </span>
          <div className='flex flex-col gap-2'>
            <p className='text-white'>Today's Orders</p>
            <h1 className='text-white font-bold text-xl'>{data.todayOrderCount}</h1>
          </div>
        </div>
      </div>
      <div className='bg-black rounded border items-center p-4 mt-4 overflow-x-auto dashboard'>
        <h2 className='font-bold text-2xl text-white flex items-center gap-2 mb-2'><span><ClockFading /></span> <span>Recent Orders</span></h2>
        <table className='min-w-full'>
          <thead className='text-left'>
            <tr className='text-white text-xl bg-[#1f2028] border-b-1'>
              <th className='p-2 '>Order Id</th>
              <th>CustomerName</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data && data.recentOrders && data.recentOrders.map((order, index) => (
              <tr className='text-white border-b-1'>
                <td className='p-2 '>{order.orderId}</td>
                <td className='p-2 '>{order.customerName}</td>
                <td className='p-2 '>{order.grandTotal}</td>
                <td className='p-2 '>{order.paymentMethod}</td>
                <td className='p-2 '>{order.paymentDetail.status}</td>
                <td className='p-2 '><p>
                  {new Date(order.createAt).toLocaleDateString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
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

export default Dashboard


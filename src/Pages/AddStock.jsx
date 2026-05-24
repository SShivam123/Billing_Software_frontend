import React, { useContext, useEffect, useState } from 'react'
import { Appcontext } from './AppContextProvider'
import { PulseLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const AddStock = () => {
    const { loadItems, Items, setItems } = useContext(Appcontext)
    console.log(Items);

    const [loading, setloading] = useState(false)
    const [selectdItem, setselectdItem] = useState("")
    const [quantity, setquantity] = useState("")
    const [errors, seterrors] = useState([])

    useEffect(() => {
        loadItems()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectdItem);

        let error = {}
        if (!selectdItem) {
            error.itemName = "please enter itemName"
        }
        if (!quantity || quantity < 0) {
            error.quantity = "please Enter the valid quantity"
        }
        seterrors(error)
        if (Object.keys(error).length > 0) {
            return;
        }

        try {
            setloading(true)
            let response = await fetch("https://billingsoftwarebackend-production-c836.up.railway.app/admin/add-stock", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    itemId: selectdItem,
                    quantity: quantity
                })
            })
            if (response.ok) {
                let data = await response.text();
                toast.success("Quantity added seccessfully")
            } else {
                toast.error("Quantity Not Added")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setloading(false)
        }
    }


    return (
        <div className='h-[calc(100vh-80px)] flex justify-center items-center bg-black/80'>
            <form action="" onSubmit={handleSubmit}>
                <div className='w-[90%] md:w-[400px] bg-white rounded p-3 flex flex-col gap-2'>
                    <h1 className='text-center text-3xl font-bold'>Add Stock</h1>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="" className='font-semibold text-xl'>Select Item</label>
                        <select name="itemId" id="" className='border rounded p-1' onChange={(e) => setselectdItem(e.target.value)} value={selectdItem}>
                            <option value="">Select Item</option>
                            {Items.length > 0 && Items.map((item, idx) => (
                                <option value={item.itemid} key={idx}>{item.name +":-"+ item.stock}</option>
                            ))}
                        </select>
                        {errors && errors.itemName && <p className='text-red-400'>{errors.itemName}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="" className='font-semibold text-xl'>Enter Quantity</label>
                        <input type="number" className='border rounded p-1' onChange={(e) => setquantity(e.target.value)} value={quantity} />
                        {errors && errors.quantity && <p className='text-red-400'>{errors.quantity}</p>}
                    </div>
                    <button className='cursor-pointer font-bold bg-amber-400 mt-1 p-1 rounded' disabled={loading}>{loading ? <PulseLoader size={12} color='#ffffff' /> : "Add Stock"}</button>
                </div>
            </form>
        </div>
    )
}

export default AddStock
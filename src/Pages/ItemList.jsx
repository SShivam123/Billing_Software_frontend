import React, { useContext, useEffect, useState } from 'react'
import { Appcontext } from './AppContextProvider'
import { Trash2, Search } from 'lucide-react';
import { toast } from 'react-hot-toast'

const ItemList = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [searchValue, setsearchValue] = useState("")
    const { Items, setItems, loadItem, setloadItem, loadItems } = useContext(Appcontext)
    // console.log(Items);


    let filterItems = Items.length > 0 && Items.filter(item => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase())
        // console.log(item);
    })

    useEffect(() => {
        loadItems()
    }, [])

    const handleDelete = async (itemid) => {
        try {
            let response = await fetch(`${API_URL}/admin/items/delete/${itemid}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status == 204) {
                const updatedItems = Items.filter(item => {
                    return item.itemid != itemid;
                })
                setItems(updatedItems)
                response = await response.text();
                toast.success("Item seccessfully deleted")
            } else {
                toast.error("Item are not deleted")
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='flex flex-col gap-5 h-full'>
            <div className='flex items-center bg-white rounded'>
                <input className='bg-white rounded p-2 w-full outline-none ' type="text" placeholder='Search by Keyword..' value={searchValue} onChange={(e) => setsearchValue(e.target.value)} />
                <span className='bg-amber-500 py-2 px-3 rounded-r'><Search /></span>
            </div>
            <div className='overflow-y-auto flex flex-col gap-2 h-full '>
                {filterItems.length > 0 ? filterItems.map((item) => (
                    <div key={item.itemId}>
                        <div className='flex justify-between items-center bg-white p-2 rounded ' style={{ backgroundColor: item.bgColor }}>
                            <div className='flex justify-between gap-2'>
                                <div className='p-1'>
                                    <img className='h-15 w-15 rounded-md' src={item.imageurl} alt="" />
                                </div>
                                <div>
                                    <h1 className='font-bold'>{item.name}</h1>
                                    <h1>category:-{item.categoryName}</h1>
                                    <h1 className='bg-amber-500 rounded-lg px-2 w-fit text-sm mt-1'>₹{item.price}</h1>
                                </div>
                            </div>
                            <div>
                                <Trash2 className='bg-red-500 cursor-pointer p-2 text-white rounded h-8 w-8' onClick={() => handleDelete(item.itemid)} />
                            </div>

                        </div>
                    </div>
                )) : <h2 className='text-white font-bold'>No product found</h2>}
            </div>
        </div>
    )
}

export default ItemList

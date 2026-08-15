import React, { useContext, useState } from 'react'
import { Appcontext } from './AppContextProvider'
import { Trash2, Search } from 'lucide-react';
import { toast } from 'react-hot-toast'

const UserList = ({Users,setUsers}) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [searchValue, setsearchValue] = useState("")
    const handleDelete = async (userId) => {
        try {
            let response = await fetch(`${API_URL}/admin/users/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status==204) {
                const updateCategory = Users.filter((user) => {
                    return user.userId != userId;
                })
                setUsers(updateCategory)
                response = await response.text();
                toast.success("seccessfully deleted")
            } else {
                toast.error("Produt are not deleted")
            }
        } catch (error) {
            console.log(error);

        }

    }

    let filterUsers = Users.filter((user)=>{
        return user.name.toLowerCase().includes(searchValue.toLowerCase())
    })

    return (
        <div className='flex flex-col gap-5 h-full'>
            <div className='flex justify-between items-center bg-white rounded'>
                <input className='bg-white rounded p-2 w-full outline-none' type="text" placeholder='Search by Keyword..' value={searchValue} onChange={(e) => setsearchValue(e.target.value)} />
                <span className='bg-amber-500 py-2 px-3 rounded-r'><Search /></span>
            </div>
            <div className='overflow-y-auto flex flex-col gap-2 h-full '>
            {filterUsers.length > 0 ? filterUsers.map((user) => (
                <div key={user.userId}>
                    <div className='flex justify-between items-center bg-white p-2 rounded'>
                        {/* <div className='p-1'>
                            <img className='h-15 w-15 rounded-md' src={category.imageUrl} alt="" />
                        </div> */}
                        <div>
                            <h1 className='font-bold'>{user.name}</h1>
                            <h1>{user.email}</h1>
                        </div>
                        <Trash2 className='bg-red-500 cursor-pointer p-2 text-white rounded h-8 w-8' onClick={() => handleDelete(user.userId)} />

                    </div>
                </div>
            )) : <h2 className='text-white font-bold'>No product found</h2>}
            </div>
        </div>
    )
}

export default UserList

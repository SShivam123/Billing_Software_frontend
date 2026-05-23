import React, { useContext, useState } from 'react'
import { Appcontext } from './AppContextProvider'
import { Trash2, Search } from 'lucide-react';
import { toast } from 'react-hot-toast'

const CategoryList = () => {
    const { category, setcategory, loadCategory } = useContext(Appcontext)
    const [searchValue, setsearchValue] = useState("")
    // console.log(category);


    let filterCategory = category.length > 0 && category.filter(categ => {
        return categ.name.toLowerCase().includes(searchValue.toLowerCase())
        // console.log(categ);
    })

    const handleDelete = async (categoryId) => {
        try {
            let response = await fetch(`https://billingsoftwarebackend-production-c836.up.railway.app/admin/category/delete/${categoryId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.ok) {
                loadCategory()
                // const updateCategory = category.filter((categ) => {
                //     return categ.categoryId != categoryId;
                // })
                // setcategory(updateCategory)
                response = await response.text();
                toast.success("seccessfully deleted")
            } else {
                toast.error("Produt are not deleted")
            }
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <div className='flex flex-col gap-5 h-full'>
            <div className='flex justify-between items-center bg-white rounded'>
                <input className='bg-white rounded p-2 w-full outline-none' type="text" placeholder='Search by Keyword..' value={searchValue} onChange={(e) => setsearchValue(e.target.value)} />
                <span className='bg-amber-500 py-2 px-3 rounded-r'><Search /></span>
            </div>
            <div className='overflow-y-auto flex flex-col gap-2 h-full '>
                {filterCategory.length > 0 ? filterCategory.map((category) => (
                    <div key={category.categoryId}>
                        <div className='flex justify-between gap-2 items-center bg-white p-2 rounded' style={{ backgroundColor: category.bgColor }}>
                            <div className='flex justify-between gap-2'>
                                <div className='p-1'>
                                    <img className='h-15 w-15 rounded-md' src={category.imageUrl} alt="" />
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='font-bold'>{category.name}</h1>
                                    {/* <h1 className='break-word'>{category.description}</h1> */}
                                    <p>count:-{category.item}</p>
                                </div>
                            </div>

                            <div>
                                <Trash2 className='bg-red-500 cursor-pointer p-2 text-white rounded h-8 w-8' onClick={() => handleDelete(category.categoryId)} />
                            </div>


                        </div>
                    </div>
                )) : <h2 className='text-white font-bold'>No product found</h2>}
            </div>
        </div>
    )
}

export default CategoryList

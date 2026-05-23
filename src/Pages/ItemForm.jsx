import React, { useContext, useRef,useState } from 'react'
import { Appcontext } from './AppContextProvider'
import toast from 'react-hot-toast'
import { PulseLoader } from 'react-spinners'

const ItemForm = () => {
    const {category,Items,setItems} = useContext(Appcontext)
    const [image, setimage] = useState(null)
    const [errors, seterrors] = useState(null)
    const [loading, setloading] = useState(false)
    const imgref = useRef()
    const [formData, setformData] = useState({
        name: "",
        categoryId: "",
        price: "",
        description: ""
    })

    const handleChange=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setformData({...formData,[name]:value})
        // console.log(value);
        
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        let error = {}
        if(!image){
            toast.error("Please upload image")
            return;
        }if(formData.name.trim()==""){
            error.name="Name Required"
        }if(formData.price.trim()==""){
            error.price="Price Required"
        }else if(Number(formData.price)<0){
            error.price="Negative Price not allowed"
        }if(formData.description.trim()==""){
            error.description="description Required"
        }if(!formData.categoryId){
            error.categoryId="Category Required"
        }

        seterrors(error)
        if(Object.keys(error).length>0){
            return;
        }
        
        const newFormdata = new FormData()
        newFormdata.append("item",JSON.stringify(formData))
        newFormdata.append("file",image)

        try{
            setloading(true)
            let response = await fetch("https://billingsoftwarebackend-production-c836.up.railway.app/admin/additem",{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                    // "Content-Type":"application/json"
                },
                body:newFormdata
            })
            let data = await response.json()
            if(response.status==201){ 
                setItems([...Items,data])
                toast.success("Item added Succcesfully")
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error("Item is alredy exist")
        }finally{
            setloading(false)
        }
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className='w-full px-5 py-3 bg-white rounded flex flex-col gap-3'>
                <div className='h-16 w-20 border' onClick={() => imgref.current.click()}>
                    <img className='h-15 w-full' src={image ? URL.createObjectURL(image) : "https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg"} alt="" />
                    <input type="file" name='image' hidden ref={imgref} onChange={(e) => setimage(e.target.files[0])} />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name" className='font-bold'>Name</label>
                    <input className='border p-1 rounded' type="text" placeholder='Write content here' name='name' id='name' 
                    value={formData.name}
                    onChange={handleChange}/>
                     {errors && errors.name &&<p className='text-red-500'>{errors.name}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="category" className='font-bold'>Category</label>
                    <select name="categoryId" id="category" className='border p-1 rounded'
                    onChange={handleChange}>
                        <option value=" ">--SELECT CATEGORY--</option>
                       {category.length>0 && category.map(categ=>(
                        <option key={categ.name} value={categ.categoryId}>{categ.name}</option>
                       ))}
                    </select>
                     {errors && errors.categoryId &&<p className='text-red-500'>{errors.categoryId}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="price" className='font-bold'>Price</label>
                    <input className='border p-1 rounded' type="number" placeholder='₹200.00' name='price' id='price' 
                    value={formData.price}
                    onChange={handleChange}/>
                     {errors && errors.price &&<p className='text-red-500'>{errors.price}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="description" className='font-bold'>Description</label>
                    <textarea className='border p-1 rounded' rows={2} name="description" id="desc" placeholder='Write content here..' 
                    value={formData.description}
                    onChange={handleChange}/>
                     {errors && errors.description &&<p className='text-red-500'>{errors.description}</p>}
                </div>
                <button className='font-bold bg-amber-400 p-1 rounded cursor-pointer' disabled={loading}>{loading? <PulseLoader size={12} color='#ffffff'/> : "Add new Item"}</button>
            </div>
        </form>
    )
}

export default ItemForm

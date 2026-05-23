import React, { useRef } from 'react'
import { useState, useContext } from 'react'
import { toast } from 'react-hot-toast'
import { Appcontext } from './AppContextProvider'

const CategoryForm = () => {
  const imgref = useRef();
  const { category, setcategory ,loadCategory} = useContext(Appcontext)
  const [loading, setloading] = useState(false)
  const [form, setform] = useState({
    name: "",
    description: "",
    bgColor: "#008000"
  })

  const [image, setimage] = useState(null)
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setform({ ...form, [name]: value })
  }

  const handleForm = (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("please upload image..")
      return;
    }
    setloading(true);
    const fromdata = new FormData();
    fromdata.append("category", JSON.stringify(form))
    fromdata.append("file", image)
    const addcategory = async () => {      
      try {
        let response = await fetch("https://billingsoftwarebackend-production-c836.up.railway.app/admin/category/addcategory", {
          method: "POST",
          headers :{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          },
          body: fromdata
        })
        if (response.status == 201) {
          console.log("Hello");
          loadCategory()
          
          response = await response.json();
          // const updateCategory = [...category, response]
          // setcategory(updateCategory);
          toast.success("category successfully added")
          setform({
            name: "",
            description: "",
            bgColor: "#008000"
          })
          setimage(null)
        }
      } catch (error) {
        toast.error("error while added the category")
      } finally {
        setloading(false)
      }
    }
    addcategory();
    console.log(form);
  }



  return (
    <form onSubmit={handleForm}>
      <div className='w-full h-full px-5 py-3 cursor-pointer bg-white rounded flex flex-col gap-2'>
        <div className='h-16 w-20 border' onClick={() => imgref.current.click()}>
          <img className='h-15 w-full' src={image ? URL.createObjectURL(image) : "https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg"} alt="" />
          <input type="file" name='image' hidden ref={imgref} onChange={(e) => setimage(e.target.files[0])} />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-bold'>Name</label>
          <input className='border p-2 rounded' type="text" placeholder='Write content here'
            value={form.name}
            onChange={handleChange}
            name='name' id='name' />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="description" className='font-bold'>Description</label>
          <textarea className='border p-2 rounded' rows={4} name="description" id="description"
            value={form.description}
            onChange={handleChange}
            placeholder='Write content here..'></textarea>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="bgColor" className='font-bold'>BackGround Color</label>
          <input type="color" placeholder='#ffffff' name='bgColor' id='bgColor' value={form.bgColor} onChange={handleChange} />
        </div>
        <button className='font-bold bg-blue-400 p-1 rounded cursor-pointer'
          onClick={handleForm} disabled={loading}>{loading ? "Summiting" : "Save"}</button>
      </div>
    </form>
  )
}

export default CategoryForm

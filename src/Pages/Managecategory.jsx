import React, { useContext, useEffect } from 'react'
import CategoryForm from './CategoryForm'
import CategoryList from './CategoryList'
import { Appcontext } from './AppContextProvider'

const Managecategory = () => {
  const{userdata,loadCategory} = useContext(Appcontext)

  useEffect(()=>{
    loadCategory()
  },[])
  return (
    <div className='sm:h-[calc(100vh-80px)] h-full w-full p-5 flex gap-5 bg-black/85 sm:flex-row flex-col'>
      <div className='left md:w-[70%] sm:w-[50%] w-full h-full rounded border border-white p-3'>
        <CategoryForm/>
      </div>
      <div className='right md:w-[30%] sm:w-[50%] w-full sm:h-full h-100 p-3 rounded border border-white overflow-auto categoryList'>
        <CategoryList/>
      </div>
    </div>
  )
}

export default Managecategory

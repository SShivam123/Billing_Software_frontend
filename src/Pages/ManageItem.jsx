import React, { useContext, useEffect } from 'react'
import ItemForm from './ItemForm'
import ItemList from './ItemList'
import { Appcontext } from './AppContextProvider'

const ManageItem = () => {
  const {loadCategory} = useContext(Appcontext)
  useEffect(()=>{
    loadCategory()
  },[])
  return (
    <div className='sm:h-[calc(100vh-80px)] h-full w-full p-5 flex gap-5 bg-black/85 sm:flex-row flex-col'>
      <div className='left md:w-[70%] sm:w-[50%] h-full rounded border border-white p-3'>
        <ItemForm loadCategory={loadCategory}/>
      </div>
      <div className='right md:w-[30%] sm:w-[50%] sm:h-full h-100 rounded border border-white p-2'>
        <ItemList />
      </div>
    </div>
  )
}

export default ManageItem

import { Search } from 'lucide-react'
import React from 'react'

const SearchBox = ({searchValue, setsearchValue ,handleChange}) => {
  return (
    <div className='flex justify-between items-center'>
      <input type="text" placeholder='Search Items...' className='p-1 rounded-l bg-white text-black w-full outline-none' onChange={handleChange} value={searchValue}/>
      <span className='bg-amber-500 py-1 px-2 rounded-r'><Search /></span>
    </div>
  )
}

export default SearchBox

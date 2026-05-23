import React,{useState} from 'react'

import Itemss from './Itemss';
import SearchBox from './SearchBox';

const DisplayItem = ({ Items ,selectedCategory }) => {
  // console.log(Items);

  const [searchValue, setsearchValue] = useState("")

  const handleChange=(e)=>{
    setsearchValue(e.target.value)
  }

  let filteredItems=Items.filter(item=>{
    if(!selectedCategory) return true;
    return selectedCategory == item.categoryId
  }).filter(item=>item.name.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div className='h-full'>
      <div className='flex justify-end'>
        <SearchBox setsearchValue={setsearchValue} searchValue={searchValue} handleChange={handleChange} />
      </div>
      <div className='flex gap-3 flex-wrap p-2 h-full overflow-y-auto itemss'>
        {filteredItems.length > 0 && filteredItems.map(item => (
          <div className='' key={item.itemid}>
            <Itemss
              imageurl={item.imageurl}
              name={item.name}
              price={item.price}
              itemid={item.itemid}
              stock={item.stock}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayItem


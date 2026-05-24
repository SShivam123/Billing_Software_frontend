import React, { useContext,useState } from 'react'
import { Appcontext } from './AppContextProvider'
import CartItem from '../component/CartItem';
import CustomerForm from '../component/CustomerForm';
import DisplayItem from '../component/DisplayItem';
import DisplayCategory from '../component/DisplayCategory';
import CartSummary from '../component/CartSummary';
import SearchBox from '../component/SearchBox';

const Explore = () => {
  const [selectedCategory, setselectedCategory] = useState("")
  const [customername, setcustomername] = useState("")
  const [customerNumber, setcustomerNumber] = useState("")
  const {category,setcategory,Items} = useContext(Appcontext)
  // console.log(category);
  // className='h-full w-full p-5 flex gap-5 bg-black/85'
  //  className='right w-[30%] h-118 rounded border border-white p-2 '
  return (
    <div  className='sm:h-[calc(100vh-80px)] h-full w-full p-5 flex gap-5 bg-black/85 sm:flex-row flex-col'>
      <div className='left md:w-[70%] sm:w-[50%] sm:h-full h-100 rounded border border-white p-3'>
        <div className=' firstRow overflow-y-auto  h-[35%] text-white'>
          <DisplayCategory category={category} selectedCategory={selectedCategory} setselectedCategory={setselectedCategory}/>
        </div>
        <hr className='text-white' />
        <div className='SecondRow h-[60%] text-white py-2'>
          <DisplayItem Items={Items} selectedCategory={selectedCategory}/>
        </div>
      </div>
      <div className='right md:w-[30%] sm:w-[50%] sm:h-full h-100 rounded border border-white p-2'>
        <div className='h-[28%] text-white'>
          <CustomerForm customername={customername} setcustomername={setcustomername} customerNumber={customerNumber} setcustomerNumber={setcustomerNumber}/>
        </div>
        <hr className='text-white' />
        <div className='cartitems h-[36%] text-white py-2 overflow-y-scroll'>
            <CartItem/>
        </div>
        <hr className='text-white' />
        <div className='h-[30%] text-white py-1'>
            <CartSummary  customername={customername} setcustomername={setcustomername} customerNumber={customerNumber} setcustomerNumber={setcustomerNumber}/>
        </div>
      </div>
    </div>
  )
}

export default Explore

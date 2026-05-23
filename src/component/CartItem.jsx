import React, { useContext } from 'react'
import { Appcontext } from '../Pages/AppContextProvider'
import { Trash } from 'lucide-react';

const CartItem = () => {
  const { CartItem, removeFromCart , UpdateQuantity} = useContext(Appcontext)
  // console.log(CartItem);

  return (
    <div className='flex flex-col gap-2'>
      {CartItem && CartItem.length === 0 && <p>Your Cart is Empty</p>}
      {CartItem && CartItem.length > 0 && CartItem.map((item, index) => (
        <div key={index} className='bg-black p-2 w-full rounded flex flex-col gap-2'>
          <div className='flex justify-between'>
            <p>{item.name}</p>
            <p>₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-1'>
              <button className='bg-red-500 h-6 w-6 rounded cursor-pointer' disabled={item.quantity == 1} onClick={()=>UpdateQuantity(item.itemid,item.quantity-1)}>-</button>
              <span>{item.quantity}</span>
              <button className='bg-blue-500 h-6 w-6 rounded cursor-pointer' onClick={()=>UpdateQuantity(item.itemid,item.quantity+1)}>+</button>
            </div>
            <Trash className='cursor-pointer bg-red-500 h-7 w-7 p-1 rounded' onClick={()=>removeFromCart(item)}/>
          </div>

        </div>
      ))}

    </div>
  )
}

export default CartItem

import { ShoppingCart } from 'lucide-react'
import React, { useContext } from 'react'
import { Appcontext } from '../Pages/AppContextProvider'

const Itemss = ({ name, imageurl, price, itemid, stock }) => {
    const { addToCart } = useContext(Appcontext)

    const handleAddToCart = () => {
        addToCart({
            name: name,
            price: price,
            itemid: itemid,
            quantity: 1

        })
    }
    return (
        <div className={`flex justify-between gap-2 bg-white p-2 w-62 rounded ${stock == 0 ? "pointer-events-none opacity-45":""}`}>
            <div className='flex items-center gap-2'>
                <div className='p-1'>
                    <img className='h-15 w-15 rounded-md' src={imageurl} alt="" />
                </div>
                <div>
                    <h1 className='font-bold text-black'>{name}</h1>
                    <h1 className='bg-amber-500 rounded-lg px-2 w-fit text-sm mt-1'>₹{price}</h1>
                    <h1 className='text-black'>Stock:-{stock}</h1>
                </div>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center'>
                {/* <ShoppingCart color='black' className='cursor-pointer' /> */}
                <p className='flex items-center justify-center h-7 w-7 rounded bg-green-600 cursor-pointer' onClick={handleAddToCart}>+</p>
            </div>
        </div>
    )
}

export default Itemss
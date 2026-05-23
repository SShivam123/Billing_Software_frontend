import React from 'react'

const Category = ({ categoryName, imageUrl, bgColor , isSelected , onClick ,item}) => {
    return (

        <div className='flex gap-2 items-center bg-white p-2 rounded relative w-55 cursor-pointer hover:scale-110 duration-300 ' style={{ backgroundColor: bgColor }} onClick={onClick}>
            <div className='p-1'>
                <img className='h-15 w-15 rounded-md' src={imageUrl} alt="" />
            </div>
            <div>
                <h1 className='font-bold'>{categoryName}</h1>
                <p>count:-{item}</p>
            </div>
            {isSelected && <div className='w-5 h-5 bg-white rounded-[50%] absolute top-1 right-1'></div>}
        </div>
    )
}

export default Category
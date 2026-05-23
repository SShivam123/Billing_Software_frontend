import React from 'react'
import Category from './Category'

const DisplayCategory = ({ category, selectedCategory, setselectedCategory}) => {
    return (
        <div className='flex gap-3 flex-wrap'>
            <div className='flex justify-between gap-2 items-center bg-white text-black font-bold p-2 rounded relative cursor-pointer hover:scale-110 w-30 duration-300' onClick={()=>setselectedCategory("")}>
                <p className='text-center'>ALL ITEMS</p>
                 {!selectedCategory && <div className='w-5 h-5 bg-black rounded-[50%] absolute top-1 right-1'></div>}
            </div>
            {category.length > 0 && category.map(cate => (
                <div className='' key={cate.categoryId}>
                    <Category
                        imageUrl={cate.imageUrl}
                        categoryName={cate.name}
                        bgColor={cate.bgColor}
                        item={cate.item}
                        onClick={() => setselectedCategory(cate.categoryId)}
                        isSelected={selectedCategory === cate.categoryId}
                    />
                </div>

            ))}
        </div>
    )
}

export default DisplayCategory

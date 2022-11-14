import React from 'react'
import { useEffect } from 'react';
import "../components/CategorySearchDropdown.css"

function CategorySearchDropdown({searchActiveCategory, setSearchActiveCategory, currentSearchCategory, setCurrentSearchCategory, setCategoryDropdown }) {

 //Function to select a category
 const categoryClick = (categoryName) => {
    let categoryData = [...searchActiveCategory]
    
    for (let i in categoryData){
        if (categoryData[i].categoryName == currentSearchCategory){
            categoryData[i].active = true;
        }else{
            categoryData[i].active = false;
        }
    }
    setSearchActiveCategory([...categoryData])
    setCurrentSearchCategory(categoryName)
    setCategoryDropdown(false)
}

  return (
    <div className='drop-down-container'>
        {searchActiveCategory.map((category, index) => {
            return (
                
                <div key={index}>
                    {category.categoryName != currentSearchCategory ?
                        <button className='category-dropdown' onClick={() => categoryClick(category.categoryName)}>
                        {category.categoryName}
                    </button>
                    : null
                    }
                        
                    
                </div>
                
            )
        })}
    </div>
  )
}

export default CategorySearchDropdown
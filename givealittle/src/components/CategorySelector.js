import React from 'react'
import "../components/Categories.css"
import { useState } from 'react'


function CategorySelector({ categoriesActivity, setAllCategoriesActivity }) {

  

  //Function to select a category
  const categoryClick = (categoryName) => {
    let categoryData = [...categoriesActivity]
    let categoryActive = categoryData.find(category => category.categoryName == categoryName).active;

    if(categoryActive){
      for(let i in categoryData){
        if(categoryData[i].categoryName != categoryName){
          categoryData[i].active = false
        }
      }
    }else{
      categoryData.find(category => category.categoryName == categoryName).active = true;
      for(let i in categoryData){
        if(categoryData[i].categoryName != categoryName){
          categoryData[i].active = false
        }
      }
    }

    setAllCategoriesActivity(categoryData)
  }


  return (
    <div>
        <div className='categories-container'>
            {categoriesActivity.map((category, index) => {
                return (
                  <div key={index}>
                    <button className="category" 
                        style={{backgroundColor: (category.active ? "#9ccc64" : "#E8E1D6")}}
                        onClick={() => categoryClick(category.categoryName)}
                        >{category.categoryName}</button>
                  </div>
                )
            })}
        </div>
        
    </div>
  )
}

export default CategorySelector
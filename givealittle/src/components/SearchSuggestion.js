import React from 'react'
import "../components/CategorySearchDropdown.css"
import { useState } from 'react';

function SearchSuggestion({ searchedProducts, searchTerm, setSearchTerm, suggestionDropdown, setSuggestionDropdown }) {
    
    


    const suggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
    }
  
    return (
    <div className='search-suggestion-container'>
        {searchTerm != ""?
            <div>
                {searchedProducts.map((product, index) => {
                    return (
                <button className='suggestion-button' key={index} onClick={() => suggestionClick(product.Name)}>{product.Name}</button>
            )
        })}
            </div>

        : null
        }
        
    </div>
  )
}

export default SearchSuggestion
import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import {auth,fs} from '../Config/Config'
import { Home } from './Home'

export const IndividualWishlistProduct = ({wishlistProduct,wishlistProductIncrease,wishlistProductDecrease}) => {

    const handleWishlistProductIncrease=()=>{
        wishlistProductIncrease(wishlistProduct);
        //will delete these 
    }

    const handleWishlistProductDecrease=()=>{
        wishlistProductDecrease(wishlistProduct);
        //will delete these
    }

    const handleWishlistProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Wishlist ' + user.uid).doc(wishlistProduct.ID).delete().then(()=>{
                    console.log('successfully deleted');
                })
            }
        })
    }

    
    
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={wishlistProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{wishlistProduct.title}</div>
            <div className='product-text description'>{wishlistProduct.description}</div>
            <div className='product-text price'>R {wishlistProduct.price}</div>
    
            <div className='btn btn-danger btn-md cart-btn' onClick={handleWishlistProductDelete} >DELETE</div>

            
        </div>
    )
}

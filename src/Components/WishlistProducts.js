import React from 'react'
import { IndividualWishlistProduct } from './IndividualWishlistProduct'

export const WishlistProducts = ({wishlistProducts,wishlistProductIncrease,
    wishlistProductDecrease}) => {
    return wishlistProducts.map((wishlistProduct)=>(
        <IndividualWishlistProduct key={wishlistProduct.ID} wishlistProduct={wishlistProduct}
        wishlistProductIncrease={wishlistProductIncrease}
        wishlistProductDecrease={wishlistProductDecrease}
        />
    ))
}

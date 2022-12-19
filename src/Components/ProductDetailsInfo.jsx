import React from 'react'
import { StarRatingProduct } from './StarRatingProduct'
import { useSelector } from 'react-redux'
import { selectProduct, selectRating, selectAddress } from '../redux/slices/detailsProductSlice'

export const ProductDetailsInfo = ({infoObject}) => {
  const rating = useSelector(selectRating);
  const address = useSelector(selectAddress);


  return (
    <div className='details-container'>
        
        <h1 className='name'>{infoObject.product.name}</h1>
        
        <h4 className='tags'></h4>
        <div className='product-rating'>
        {
          [...Array(5)].map((_, index) => {
            return (
              <StarRatingProduct
                key={index}
                index = {index + 1}
                val = {rating}
              />
            );
          })
        }
        </div>

        <h2 className='price'>{infoObject.product.price} $</h2>
            
        <div className='vendor'>
            Shop details:
            <p className='vendor-name'>Name of the shop:{infoObject.shop.name}</p>
            <p className='vendor-address'>Address: {address}</p> 
            <p className='vendor-description'>About us: {infoObject.shop.description}</p> 
        </div>

        <h3 className='details-header'>Product Details</h3>
        
        <span className='details-info'>{infoObject.product.description}
        </span>
    </div>
  )
}

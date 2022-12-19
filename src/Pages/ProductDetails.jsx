import React from 'react'
import { AddCartButton } from '../Components/AddCartButton'
import { Comment } from '../Components/Comment';
import { ReviewForm } from '../Components/ReviewForm';
import { ProductDetailsInfo } from '../Components/ProductDetailsInfo';
import { SuggProductBlock } from '../Components/SuggProductBlock';
import Product from '../models/Product';
import { useState } from 'react';
import { AddProduct } from '../Components/AddProduct';
import { UpdateProduct } from '../Components/UpdateProduct'
import { ModalWindow } from '../Components/AuthModalWindow';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../redux/requests';
import { selectProduct, selectImages } from '../redux/slices/detailsProductSlice';
import { FeedbackBlock } from '../Components/FeedbackBlock';
import { getMyReview } from '../redux/requests';
import { selectProfile } from '../redux/slices/authSlice';
import { selectAddress } from '../redux/slices/detailsProductSlice';

export const ProductDetails = () => {

  const { id } = useParams()
  const dispatch = useDispatch();
  const [activeImageIndex, setActiveImage] = useState(0);
  const infoObject = useSelector(selectProduct);
  const images = useSelector(selectImages);
  const profile = useSelector(selectProfile);

  useEffect(() =>{
    dispatch(getProductById(id));
    dispatch(getMyReview({productId: id, userId: profile.id}))

  },[])

  return (
    
    <div className='details'>
      <div className='details-top'>
        <div className='details-top__left'>
          <div className='details-image'>
            <img
              className="details-image__block"
              src={images[activeImageIndex].url}
              alt="BigImage"
            />

            <div className='details-image__small-group'>

              {images.map((image, index) => 
                <div className={`small-img-col ${index === activeImageIndex ? 'active' : ''}`} 
                     key= {image.id}
                     onClick = {() => setActiveImage(index)}>
                  <img
                    className="small-img"
                    src= {image.url}
                    alt="SmallImage"
                  /> 
                </div>
              )}

            </div>
          </div>
        </div>

        <div className='details-top__right'>

          <ProductDetailsInfo infoObject={infoObject} />
          <AddCartButton product={infoObject.product} />

        </div>

      </div>

      <div className='details-center'>
        {/* <div className='sugg-grid'>
          {Products.map((product) => <SuggProductBlock product={product} key={product.id + product.name + 'det'} />)}
        </div> */}
      </div>

      <div className='details-bottom'>
        <FeedbackBlock/>
      </div>
    </div >
  )
}

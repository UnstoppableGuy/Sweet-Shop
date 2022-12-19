import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectReviews } from '../redux/slices/profileSlice';
import { useDispatch } from 'react-redux';
import { fetchRevies } from '../redux/requests';
import { selectProfile } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { ResponseWindow } from './ResponseWindow';
import { ModalWindow } from './ModalWindow';
import { setTextResponse, setEmailResponse } from '../redux/slices/transitSlice';

export const Reviews = () => {

    const reviews = useSelector(selectReviews);
    const dispatch = useDispatch();
    const user   = useSelector(selectProfile);
    const nivagate = useNavigate()
    const handleRedirect = (id) =>{
        nivagate(`/product/${id}`)
    }

    useEffect(() => {

        dispatch(fetchRevies({userId: user.id}))
    }, [])

    const parseDate = (date) =>{
      var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      var date =  new Date(date.replace(pattern,'$3-$2-$1'));
      return date.toDateString();
    }

    const hadnleResponse = (email) => {
        // console.log(email);
        dispatch(setEmailResponse(email))
        nivagate('/profile/feedback/response');
    }
  
    return (
        reviews.map((review) => 
            <div className='review-block2' key={review.id}>
                    <div className='review-group2'>
                        <div className='review-group2__header-line2'>
                        <div className='person2'>
                            {review.email}  
                        </div> 
        
                        <div className='date2'>
                            {parseDate(review.publishedAt)} 
                        </div>
                        </div>  
        
                        <div className='review-group2__review-wrapper2'>
                        
                        <div className='review-text2' onClick={() => hadnleResponse(review.email)}>
                            {review.text}
                        </div>
        
                        <div className='additional2'>
                            <div className='review-text2' onClick={()=>handleRedirect(review.productId)}>
                                {review.productId}
                            </div> 
                        </div>
                    </div>
                </div> 
            </div>
    ))
}

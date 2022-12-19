import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { StarRating } from './StarRating';
import { selectMyReview, selectProductId } from '../redux/slices/detailsProductSlice';
import { useDispatch } from 'react-redux';
import { updateMyReviewRating, updateMyReviewText } from '../redux/slices/detailsProductSlice';
import { findByAltText } from '@testing-library/react';
import { putMyReview } from '../redux/requests';
import { selectProfile } from '../redux/slices/authSlice';
import { putComment } from '../redux/requests';

export const ReviewForm = () => {

  const [currentBtnState, setCurrentBtnState] = useState(true);
  const [isComment, setIsComment] = useState(false);
  const [comment, setComment] = useState('');
  const myReview = useSelector(selectMyReview);
  const dispatch = useDispatch();
  const user = useSelector(selectProfile);
  const currentProduct = useSelector(selectProductId);

  const handletextChange = (e) => {
    if(isComment) {
      setComment(e.target.value)
    }
    else{
      dispatch(updateMyReviewText(e.target.value));
    }
  };
    

  const handleCancelBtn= () =>{
    setCurrentBtnState(true)
    setComment('')
  }

  const handleSend = () =>{
    if(!isComment)
    {
      dispatch(putMyReview({userId: user.id, productId: currentProduct, text: myReview.text, rating: myReview.rating}))
      setCurrentBtnState(true)
    }
    else{
      dispatch(putComment({userId: user.id, productId: currentProduct, text: comment} ))
      setComment('')
      setCurrentBtnState(true)
    }
  };


  return (
    <div className='new-review'>
        
        <div onClick={() => setCurrentBtnState(!currentBtnState)} className='state-btn' style={{display: !currentBtnState ? 'none': 'flex'}}>
            <span className='text'>
                Write a review
            </span>
        </div>

        <div className='newform-container' style={{display: !currentBtnState ? 'block': 'none'}}>
            <div className='newform-container__nav-container'>
                <div className='feedback-container'>
                  <div className={`text ${!isComment ? 'active-text' : ''}`} onClick={() => setIsComment(false)}>
                    Leave feedback
                  </div>

                  <div className={`text ${isComment ? 'active-text' : ''}`} onClick={() => setIsComment(true)}>
                    Leave comment
                  </div>

                </div>
                <div onClick={() => handleCancelBtn()} className='text'>
                  Cancel
                </div>
            </div>
               
            <form method="post" className='review-form'>

              <textarea value={isComment ? comment: myReview.text } className='inp' onChange={(e) => handletextChange(e)}>
              </textarea>

              <div className={`form-footer ${isComment ? 'form-footer-comment' : ''}`}>
                {
                  !isComment &&
                  <div className='star-rating'>
                    {
                      [...Array(5)].map((_, index) => {
                        return (
                          <StarRating
                            key={index + 1}
                            index = {index + 1}   
                          />
                        );
                      })
                    }   
                    
                  </div>
                }

                <div className='send-btn' onClick={() => handleSend()}>
                  Send feedback
                </div>
              </div>

            </form>

       </div>
      </div>
  )
}

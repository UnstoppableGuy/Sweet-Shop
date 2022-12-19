import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Comment} from './Comment';
import { ReviewForm } from './ReviewForm';
import { selectFeedback } from '../redux/slices/detailsProductSlice';
import { fetchComments, fetchReviews  } from '../redux/requests';
import { selectProductId } from '../redux/slices/detailsProductSlice';
import { setFeedbackPage } from '../redux/slices/detailsProductSlice';

export const FeedbackBlock = ({product}) => {
  const [isCommentSection, setIsCommentSection] = useState(true);
  const fb = useSelector(selectFeedback);
  const productId = useSelector(selectProductId);
  const dispatch = useDispatch();

  const handleMoveLeft = () => {
    if(fb.page > 1){
      dispatch(setFeedbackPage(fb.page- 1))
    }
  }

  const handleMoveRight = () => {
    console.log('handleMoveRight');
    dispatch(setFeedbackPage(fb.page + 1))
  }

  const fetchFeedB = (page) => {
    if(isCommentSection)
      dispatch(fetchComments({productId, page: fb.page}))
    else
      dispatch(fetchReviews({productId, page: fb.page}))
  }

  useEffect(()=>{
    fetchFeedB();
  }, [isCommentSection, productId, fb.page])

  return (
    <>
      <div className='details-bottom__left'>
        <div className='comments-header'>
            <div className='comments-header-title'>
              Here you can see the feedback from our customers
            </div>
        </div>
      </div>

      <div className='details-bottom__right'>
        <div className='comments-header-tabs'>
          <div className={`comments-header-tabs__col ${ isCommentSection ? 'col-active': ''}`} onClick= {() => setIsCommentSection(true)}>
            Comments
          </div>

          <div className={`comments-header-tabs__col ${ isCommentSection ? '' : 'col-active'}`} onClick= {() => setIsCommentSection(false)}>
            Feedback
          </div>
        </div>

        {
          fb.items.map((item, index) => {
          return (
            <Comment
              key={item.id}
              obj = {item}
              flag = {isCommentSection}
            />
          );
        })}

        <div  className = 'simple-pag-wrapper'>
          <div  className='pagination-link-arr' 
                href='#' 
                aria-label='Previous'
                onClick={handleMoveLeft}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
              <path className="cls-1" d="M15.12,15.53,25,5.66a1,1,0,0,1,1.41,1.41l-9.06,9.06,8.8,8.8a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.42,0l-9.61-9.61A.85.85,0,0,1,15.12,15.53Z"/>
              <path className="cls-1" d="M5.54,15.53l9.88-9.87a1,1,0,1,1,1.41,1.41L7.77,16.13l8.8,8.8a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L5.54,16.73A.85.85,0,0,1,5.54,15.53Z"/>
            </svg>
          </div>
        
          <div  className='pagination-link-arr' 
            onClick={handleMoveRight}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
              <path className="cls-1" d="M16.88,15.53,7,5.66A1,1,0,0,0,5.59,7.07l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.42,0l9.61-9.61A.85.85,0,0,0,16.88,15.53Z"/>
              <path className="cls-1" d="M26.46,15.53,16.58,5.66a1,1,0,0,0-1.41,1.41l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.41,0l9.62-9.61A.85.85,0,0,0,26.46,15.53Z"/>
            </svg>
          </div>
        
        
        </div>

        <ReviewForm />  
    </div>
    </>
)}

import React from 'react'
import { useSelector } from 'react-redux';
import { selectMyReview, updateMyReviewRating } from '../redux/slices/detailsProductSlice';
import { useDispatch } from 'react-redux';

export const StarRating = ({index}) => {

    const review = useSelector(selectMyReview);
    const rating = review.rating;
    const dispatch = useDispatch();

    const handleStarClick = (val) => {
        dispatch(updateMyReviewRating(val));
      }
    

  return (
    <svg className='star' xmlns="http://www.w3.org/2000/svg" id="Icons" viewBox="0 0 24 24" onClick={() => handleStarClick(index)}>
        <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="linear-gradient" x1="12" x2="12" y1="1.755" y2="23.076">
                <stop offset="0" stopColor="#fff650"/>
                <stop offset="1" stopColor="#ffab17"/>
            </linearGradient>
        </defs>
        <path className={`${index <= rating ? 'active-star' : ''}`}
            d="M12.992,20.912l3.5,1.838A2.131,2.131,0,0,0,19.58,20.5l-.667-3.893a2.129,2.129,0,0,1,.613-1.887l2.828-2.757a2.131,2.131,0,0,0-1.181-3.635l-3.909-.568a2.133,2.133,0,0,1-1.6-1.166L13.911,3.056a2.131,2.131,0,0,0-3.822,0L8.341,6.6a2.133,2.133,0,0,1-1.6,1.166l-3.909.568a2.131,2.131,0,0,0-1.181,3.635l2.828,2.757a2.129,2.129,0,0,1,.613,1.887L4.42,20.5A2.131,2.131,0,0,0,7.512,22.75l3.5-1.838A2.135,2.135,0,0,1,12.992,20.912Z"
        />
    </svg>
    
  )
}

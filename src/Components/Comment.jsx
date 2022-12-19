import React from 'react'
import { useSelector } from 'react-redux';
import { selectProfile } from '../redux/slices/authSlice';

export const Comment = ({obj, flag}) => {

  const user = useSelector(selectProfile);

  const parseDate = () =>{
    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    var date =  new Date(obj.publishedAt.replace(pattern,'$3-$2-$1'));
    return date.toDateString();
  }

  return (
    <div className='review-block'>
            <div className='review-group'>
              <div className='review-group__header-line'>
                <div className='person'>
                  {obj.email}  
                </div> 

                <div className='date'>
                  {parseDate()} 
                </div>
                {
                  user.email === obj.email && flag ?
                  <>
                    <svg 
                      className='productShop-btn-small'
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 1696.143 1696.143" 
                    >
                      <g id="pen">
                          <path className='path-c' d="M1648.016,305.367L1390.795,48.149C1359.747,17.098,1318.466,0,1274.555,0c-43.907,0-85.188,17.098-116.236,48.148   L81.585,1124.866c-10.22,10.22-16.808,23.511-18.75,37.833L0.601,1621.186c-2.774,20.448,4.161,41.015,18.753,55.605   c12.473,12.473,29.313,19.352,46.714,19.352c2.952,0,5.923-0.197,8.891-0.601l458.488-62.231   c14.324-1.945,27.615-8.529,37.835-18.752L1648.016,537.844c31.049-31.048,48.146-72.33,48.146-116.237   C1696.162,377.696,1679.064,336.415,1648.016,305.367z M493.598,1505.366l-350.381,47.558l47.56-350.376L953.78,439.557   l302.818,302.819L493.598,1505.366z M1554.575,444.404l-204.536,204.533l-302.821-302.818l204.535-204.532   c8.22-8.218,17.814-9.446,22.802-9.446c4.988,0,14.582,1.228,22.803,9.446l257.221,257.218c8.217,8.217,9.443,17.812,9.443,22.799   S1562.795,436.186,1554.575,444.404z"/>
                      </g>
                    </svg>
            </> : <></>
            }
              </div>  

              <div className='review-group__review-wrapper'>
                
                <div className='review-text'>
                  {obj.text}
                </div>

                <div className='additional'> 
                </div>
            </div>
        </div>  
    </div>
  )
}
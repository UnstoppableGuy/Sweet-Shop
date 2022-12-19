import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProduct } from '../redux/slices/transitSlice'

export const ProductBlockShop = ({productItemShop}) => {

  const { product, images, tags, categories} = productItemShop
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(images.length > 0)
    var image = images[0].url

  const handleEditProductClick = () => {
    dispatch(setProduct(product));
    navigate('product/update');
  }

  return (
    <div className="productShop-block">
        <NavLink to={`/product/${product.id}`}>
          <img
            className="productShop-block__image"
            src={image}
            alt="product"
          />
          <h4 className="product-block__title">{product.name}</h4>
          <div className="product-block__price">
            <span>{product.price} $</span>
          </div>
        </NavLink>

        <div className="product-block__bottom">
            <svg onClick={handleEditProductClick}
                className='productShop-btn'
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1696.143 1696.143" 
            >
                <g id="pen">
                    <path className='path-c' d="M1648.016,305.367L1390.795,48.149C1359.747,17.098,1318.466,0,1274.555,0c-43.907,0-85.188,17.098-116.236,48.148   L81.585,1124.866c-10.22,10.22-16.808,23.511-18.75,37.833L0.601,1621.186c-2.774,20.448,4.161,41.015,18.753,55.605   c12.473,12.473,29.313,19.352,46.714,19.352c2.952,0,5.923-0.197,8.891-0.601l458.488-62.231   c14.324-1.945,27.615-8.529,37.835-18.752L1648.016,537.844c31.049-31.048,48.146-72.33,48.146-116.237   C1696.162,377.696,1679.064,336.415,1648.016,305.367z M493.598,1505.366l-350.381,47.558l47.56-350.376L953.78,439.557   l302.818,302.819L493.598,1505.366z M1554.575,444.404l-204.536,204.533l-302.821-302.818l204.535-204.532   c8.22-8.218,17.814-9.446,22.802-9.446c4.988,0,14.582,1.228,22.803,9.446l257.221,257.218c8.217,8.217,9.443,17.812,9.443,22.799   S1562.795,436.186,1554.575,444.404z"/>
                </g>
            </svg>
            {/* <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className='productShop-btn'
                viewBox="0 0 32 32" 
                >
                <g id="trash">
                    <path className='path-c' clip-rule="evenodd" d="M29.98,6.819c-0.096-1.57-1.387-2.816-2.98-2.816h-3v-1V3.001   c0-1.657-1.344-3-3-3H11c-1.657,0-3,1.343-3,3v0.001v1H5c-1.595,0-2.885,1.246-2.981,2.816H2v1.183v1c0,1.104,0.896,2,2,2l0,0v17   c0,2.209,1.791,4,4,4h16c2.209,0,4-1.791,4-4v-17l0,0c1.104,0,2-0.896,2-2v-1V6.819H29.98z M10,3.002c0-0.553,0.447-1,1-1h10   c0.553,0,1,0.447,1,1v1H10V3.002z M26,28.002c0,1.102-0.898,2-2,2H8c-1.103,0-2-0.898-2-2v-17h20V28.002z M28,8.001v1H4v-1V7.002   c0-0.553,0.447-1,1-1h22c0.553,0,1,0.447,1,1V8.001z" fill-rule="evenodd"/>
                    <path className='path-c' clip-rule="evenodd" d="M9,28.006h2c0.553,0,1-0.447,1-1v-13c0-0.553-0.447-1-1-1H9   c-0.553,0-1,0.447-1,1v13C8,27.559,8.447,28.006,9,28.006z M9,14.005h2v13H9V14.005z" fill-rule="evenodd"/>
                    <path className='path-c' clip-rule="evenodd" d="M15,28.006h2c0.553,0,1-0.447,1-1v-13c0-0.553-0.447-1-1-1h-2   c-0.553,0-1,0.447-1,1v13C14,27.559,14.447,28.006,15,28.006z M15,14.005h2v13h-2V14.005z" fill-rule="evenodd"/>
                    <path className='path-c' clip-rule="evenodd" d="M21,28.006h2c0.553,0,1-0.447,1-1v-13c0-0.553-0.447-1-1-1h-2   c-0.553,0-1,0.447-1,1v13C20,27.559,20.447,28.006,21,28.006z M21,14.005h2v13h-2V14.005z" fill-rule="evenodd"/>
                </g>
            </svg>  */}
        </div>
      </div>
  )
}

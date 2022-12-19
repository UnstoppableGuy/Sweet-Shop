import React from 'react'
import { NavLink } from 'react-router-dom';
import { AddCartButton } from './AddCartButton';

export const SuggProductBlock = ({product}) => {
  return (
    <div className="small-product">
        <NavLink to={`/product/${product.id}`}>
            <img
                className="small-product__image"
                src={product.image}
                alt="product"
            />
            <h4 className="small-product__title">{product.name}</h4>
        </NavLink>

        <div className="small-product__bottom">
            <div className="small-product__price">{product.price} $</div>  
            <AddCartButton product={product}/>
        </div>
    </div>
  )
}

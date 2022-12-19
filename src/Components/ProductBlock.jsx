import { NavLink } from "react-router-dom";
import { AddCartButton } from "./AddCartButton";

import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemById, addItem } from '../redux/slices/cartSlice';

function ProductBlock({product}){

  return (
      <div className="product-block">
        <NavLink to={`/product/${product.id}`}>
          <img
            className="product-block__image"
            src={product.image}
            alt="product"
          />
          <h4 className="product-block__title">{product.name}</h4>
          <div className="product-block__details">
            <span>{product.description}</span>
            {/* <span>{product.tags[0].text}</span> */}
          </div>
        </NavLink>

        <div className="product-block__bottom">
          <div className="product-block__price">{product.price} $</div>  
          <AddCartButton product={product} />
        </div>
      </div>
)
}

export default ProductBlock;
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addItem, minusItem, removeItem } from '../redux/slices/cartSlice';
import { deleteProductFromCart } from '../redux/requests';
import { selectProfile } from '../redux/slices/authSlice';
import { putProductIntoCart } from '../redux/requests';

export const CartItem = ({cartProduct}) => {

  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();

  const onPlusClickHandler = () => {
    // if(await putProductIntoCart(cartProduct.count + 1, cartProduct.id, profile.id)=== 200)
        dispatch(addItem(cartProduct));
        putProductIntoCart(cartProduct.count + 1, cartProduct.id, profile.id)
  //     else {
  //       alert('Something went wrong. Try to add the product later')
  //     }
  };

  const onMinusClickHandler = () => {
    if(cartProduct.count > 1)
    {
      // if(putProductIntoCart(cartProduct.count - 1, cartProduct.id, profile.id) === 200)
        dispatch(minusItem(cartProduct));
        putProductIntoCart(cartProduct.count - 1, cartProduct.id, profile.id)  
      // else {
      //     alert('Something went wrong. Try to decrease quantity of the product later')
      // }
    }

    if(cartProduct.count === 1){
      onRemoveClickHandler();
    }
  };

  const onRemoveClickHandler = () => {
    if(window.confirm('Are you sure you want to remove?'))
    {
      // if(deleteProductFromCart(cartProduct.id, profile.id) === 200)
        dispatch(removeItem(cartProduct));
        deleteProductFromCart(cartProduct.id, profile.id)
      // else{
      //   alert('Something went wrong. Try to remove the product later')
      // }
    }
  };

  return (
    <div className="cart__item">

      <div className="cart__item-infowrapper">

      <NavLink to={`/product/${cartProduct.id}`}>
        <div className="cart__item-infowrapper-img">
          <img className="product-block__image" src={cartProduct.image} alt="Product" />
        </div>
        <div className="cart__item-infowrapper-info">
          <h3>{cartProduct.name}</h3>
          <p>
            {cartProduct.description}
          </p>
        </div>
      </NavLink>

      </div>

      <div className="cart__item-buttons">

        <div className="cart__item-buttons-count">

          <button
            className="button button--outline button--circle cart__item-buttons-count-minus" onClick={onMinusClickHandler}>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"></path>
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"></path>
            </svg>
          </button>

          <b>{cartProduct.count}</b>

          <button
            className="button button--outline button--circle cart__item-buttons-count-plus" onClick={onPlusClickHandler}>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"></path>
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"></path>
            </svg>
          </button>

        </div>

        <div className="cart__item-buttons-price">
          <b>{cartProduct.price * cartProduct.count} $</b>
        </div>

        <div className="cart__item-buttons-remove" onClick={onRemoveClickHandler}>
          <div
            className="button button--outline button--circle">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"></path>
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"></path>
            </svg>
          </div>

        </div>
      </div>
    </div>
  )
}

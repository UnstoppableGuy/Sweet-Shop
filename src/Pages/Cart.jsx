import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CartItem } from '../Components/CartItem';
import { calcCountOfProducts, selectCartDetails } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { selectTotalAmount } from '../redux/slices/cartSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { EmptyCart } from '../Components/EmptyCart';
import { clearCartByUserId } from '../redux/requests';
import { selectProfile } from '../redux/slices/authSlice';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalCheckoutButton from '../Components/PaypalCheckoutButton';


export const Cart = () => {

  const dispatch = useDispatch();
  const profile = useSelector(selectProfile)
  const items = useSelector(selectCartDetails);
  const totalAmount = useSelector(selectTotalAmount);
  const totalCount = useSelector(calcCountOfProducts);

  const onClearClickhandler = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      // if(clearCartByUserId(profile.id) === 200)
      dispatch(clearCart());
      clearCartByUserId(profile.id)
      // else{
      //   alert('Something went wrong. Try to clear the cart later')  
      // }
    }
  };

  const userorder = {
    description: "user",
    price: totalAmount
  };

  if (items.length === 0)
    return <EmptyCart />
  else
    return (
      <div className="container container--cart">

        <div className="cart">

          <div className="cart__top">
            <h2 className="content__title">Cart</h2>
            <div className="cart__clear" onClick={onClearClickhandler}>
              <span>Clear cart</span>
            </div>
          </div>

          <div className="content__items">
            {
              items.map((cartProduct) => <CartItem cartProduct={cartProduct} key={cartProduct.id} />)
            }
          </div>

          <div className="cart__bottom">

            <div className="cart__bottom-details">
              <span> Total: <b>{totalCount} pcs</b> </span>
              <span> Amount: <b>{totalAmount} $</b> </span>
            </div>

            <div className="cart__bottom-buttons">
              <NavLink to="/" className="button button--outline button--add go-back-btn">
                <span>Back to home page</span>
              </NavLink>



              <PayPalScriptProvider options={
                { "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
                <div className="pay-btn">
                  <PaypalCheckoutButton className="button pay-btn" orderRequest={userorder} />
                </div>
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    )
}

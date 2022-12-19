import React from 'react'
import { NavLink } from 'react-router-dom'
import cartEmptyImg from '../assets/images/empty-cart.png'

export const EmptyCart = () => {
  return (
    <div className="cart cart--empty">
        <h2>
            The Cart is empty <span>😕</span>
        </h2>

        <p>
            To order a product, go to the main page.
        </p>

        <img src={cartEmptyImg} alt="Empty cart" />

        <NavLink to="/" className="button button--black">
            <span>Back to home page</span>
        </NavLink>
        
    </div>
  )
}

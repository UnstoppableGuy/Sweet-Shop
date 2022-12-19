import React from 'react'
import { OrderItem } from './OrderItem'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { selectOrderDetails, selectTotalAmount, calcCountOfProducts } from '../redux/slices/orderSlice'
import { selectOrder } from '../redux/slices/transitSlice'
import { getOrderItems } from '../redux/requests'
export const OrderDetails = () => {

    const items = useSelector(selectOrderDetails);
    const totalAmount = useSelector(selectTotalAmount);
    const totalCount = useSelector(calcCountOfProducts);
    const order = useSelector(selectOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderItems({orderId : order}))   
    }, [])
    
    return (
    <div className="container container--cart">
        <div className="content__items">
        {
            items.map((orderItem) => <OrderItem orderItem={orderItem} key={orderItem.id} />)
        }
        </div>

        <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span> Total: <b>{totalCount} pcs</b> </span>
              <span> Amount: <b>{totalAmount} $</b> </span>
            </div>
        </div>
    </div>
  )
}

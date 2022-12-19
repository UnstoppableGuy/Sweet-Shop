import React from 'react'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchOrders } from '../redux/requests';
import { selectorders } from '../redux/slices/profileSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOrder } from '../redux/slices/transitSlice';

export const Orders = ({userId}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector(selectorders);

    useEffect(() => {
        dispatch(fetchOrders({userId: userId}))
    },[]);

    const parseDate = (date) =>{
        var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        var date =  new Date(date.replace(pattern,'$3-$2-$1'));
        return date.toDateString();
    }

    const handleOrderDetails = (orderId) => {
        dispatch(setOrder(orderId));
        navigate('/profile/order/details');     
    }

    return (
    <section className='orderList-wrapper'>
        {
        orders.map((order) => 
            <div className='order' key={order.id} onClick= {() => handleOrderDetails(order.id)}>
                <div className='order-header'>
                    <div className='order-header__left'>
                        <span className='date'>Order from {parseDate(order.createdat)}</span>
                        <div className='order-num'>{order.id}</div>
                    </div>
                    <div className='order-header__right'>
                        <div className='pay-block'>
                            <span className='text'>paid</span>
                            <div className='paid'>{order.amount} $</div>
                        </div>
                    </div>
                </div>

                <div className='order-bottom'>

                    <div className='line'>
                        <span className='address'>Belarus, Minsk, Pushkina St, 30</span>
                        <div className='status-border'>
                            <span className='st'>{order.status}</span>
                        </div>
                    </div>

                    <div className='r'>
                        <span className='addit-info'>Delivery date: {parseDate(order.deliverydate)}</span>
                    </div>
                </div>
            </div>)
        }
    </section>
  )
}
